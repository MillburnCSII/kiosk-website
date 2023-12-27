// "use client";
import styles from "../page.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import FilterComponent from "../components/FilterComponent";
import SignOutComponent from "../components/SignOutComponent";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home({ params, searchParams }) {
  const session = await getServerSession(authOptions);
  // console.log(data);
  console.log(session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const page = parseInt(searchParams.page ?? "0", 10);
  console.log(page);
  const pageSize = 5;
  const data = await getData(searchParams);

  return (
    <main className={styles.recordsWrapper}>
      <div className={styles.header}>
        <h1>Kiosk Records</h1>
        <SignOutComponent />
      </div>
      <FilterComponent 
        values={[]}
      />
      <div className={styles.records}>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Access Level</th>
              <th scope="col">Privilege</th>
              <th scope="col">Direction</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
            </tr>
          </thead>
          <tbody>
            {data.records.map((record) => (
              <tr key={record.kioskName}>
                <td>{record.kioskName}</td>
                <td>{record.accessLevel}</td>
                <td>{record.privilege}</td>
                <td>{record.direction}</td>
                <td>{record.startHour}:{record.startMinute}</td>
                <td>{record.endHour}:{record.endMinute}</td>
              </tr>
            ))}
            {[...Array(pageSize - data.records.length)].map((_, i) => (
              <tr key={i} className={styles.disabled}>
                {[...Array(6)].map((_, i) => (
                  <td key={i}>N/A</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                <nav>
                  <div>
                    <p>
                      Showing <span>{page * pageSize + 1}</span> to <span>{(page + 1) * pageSize}</span> of <span>{data.count}</span> results
                    </p>
                  </div>
                  <div>
                    <Link href={`/?page=${page - 1}`} className={page <= 0 ? styles.disabled : ""}>
                      {" "}
                      Previous{" "}
                    </Link>
                    <Link href={`/?page=${page + 1}`} className={page + 1 * pageSize >= data.count ? styles.disabled : ""}>
                      {" "}
                      Next{" "}
                    </Link>
                  </div>
                </nav>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}

async function getData(searchParams) {
  const page = await fetch(`http://localhost:8080/listKiosks?${new URLSearchParams(searchParams).toString()}`);
  const count = await fetch("http://localhost:8080/kiosks");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!page.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch page");
  }
  if (!count.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch count");
  }

  return {
    records: await page.json(),
    count: (await count.json()).count,
  };
}

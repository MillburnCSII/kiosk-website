"use client";

import styles from "./FilterComponent.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Gallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const [filter, setFilter] = useState(urlSearchParams.get("filterBy") ?? "");
  const [filterValue, setFilterValue] = useState(urlSearchParams.get("filterValue") ?? "");

  const changePath = () => {
    if (filter !== "" && filterValue.trim() === "") {
      return console.error("Filter value is empty");
    }

    urlSearchParams.set("filterBy", filter);
    urlSearchParams.set("filterValue", filterValue);
    // remove empty params
    let keysForDel = [];
    urlSearchParams.forEach((value, key) => {
      if (value == "") {
        keysForDel.push(key);
      }
    });

    keysForDel.forEach((key) => {
      urlSearchParams.delete(key);
    });
    console.log(urlSearchParams.toString());
    router.push(`/?${urlSearchParams.toString()}`);
    // router.refresh();
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setFilterValue("");
          }}
        >
          <option value="">All</option>
          <option value="num">Record Number</option>
          <option value="id">Student ID</option>
          <option value="prev_status">Previous Status</option>
          <option value="new_status">New Status</option>
          <option value="kiosk_name">Kiosk Name</option>
        </select>
        {filter === "num" || filter === "id" || filter === "prev_status" || filter === "new_status" ? (
          <input type="number" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
        ) : filter === "kiosk_name" ? (
          <input type="text" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
        ) : (
          <span></span>
        )}
        <button onClick={changePath}>Search</button>
      </div>
    </div>
  );
}

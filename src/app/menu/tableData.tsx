"use client";
import React, {useEffect, useState} from "react";
import useStore from "@/store/Auth";
import {format} from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

const TableDisplay = () => {
  const [data, setData] = useState([]);
  const callTableUpdate = useStore((state) => state.tableData);
  let forRefresh = "";

  // table data is used for setting the table it cannot be used for getting the data
  const tableRecord = useStore((state) => state.tableData);
  console.log(tableRecord, "Tab");
  async function getData() {
    const fetchData = await axios.get("http://localhost:3000/api/get-data");
    console.log(fetchData.data.data);
    setData(fetchData.data.data);
  }
  useEffect(() => {
    getData();
  }, [callTableUpdate]);
  console.log(data);
  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Host Name</TableHead>
            <TableHead>Record Type</TableHead>
            <TableHead className="text-right">Updated at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((e: any, index) => {
            // const foramtedDate = new Date(e.updatedAt).toLocaleString();
            const foramtedDate = format(
              new Date(e.updatedAt),
              "yyyy-MM-dd hh:mm:ss"
            );
            const fom1 = format(new Date(e.updatedAt), "MMMM d, yyyy");
            // const fom1 = format(new Date(e.updatedAt), 'h:mm a');
            return (
              <TableRow>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{e.hostName}</TableCell>
                <TableCell>{e.recordType}</TableCell>
                <TableCell className="text-right">{fom1}</TableCell>
              </TableRow>
            );
          })}
          {/* <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDisplay;

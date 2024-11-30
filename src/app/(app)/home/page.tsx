"use client";
import React, {useEffect, useState} from "react";
import {DropdownMenuRadioGroupDemo} from "@/app/menu/Dropdown";
import {Button} from "@/components/ui/button";
import useStore from "@/store/Auth";
import axios from "axios";
import {useUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import TableDisplay from "@/app/menu/tableData";
// import {auth} from "@clerk/nextjs/server";
// import {currentUser} from "@clerk/nextjs/server";

const countries = [
  {
    name: "India",
    value: "IN",
    cities: ["Delhi", "Mumbai"],
  },
  {
    name: "Pak",
    value: "PK",
    cities: ["Karachi", "Lahore"],
  },
  {
    name: "Bangladesh",
    value: "BG",
    cities: ["Dhaka", "Chittagong"],
  },
];

const HomePage = () => {
  const {isSignedIn, user} = useUser();
  const [input, setInput] = useState("");
  const currRecord = useStore((state) => state.record);
  const updateTableData = useStore((state) => state.updateTableData);
  const updatedRecords = useStore((state) => state.updatedRecords);

  // const abc = useStore((state) => state.tableData);
  // tableData("Ghyanshyammm");
  // const abc1 = useStore((state) => state.tableData);
  // console.log(abc, abc1);

  if (!isSignedIn) {
    redirect("/sign-in");
  }
  // This is how im gonna add data over the server
  async function handleSubmit() {
    // console.log(currRecord, "HHHHHH", input, user?.id);
    try {
      const sendData = await axios.post(
        "http://localhost:3000/api/add-data",
        {
          hostName: input,
          recordType: currRecord,
          clerk_id: user?.id,
          // userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      updateTableData(Math.random());
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  return (
    <div>
      <div className=" md:flex mt-10 md:items-start  sm:justify-center grid place-items-center grid-cols-1 gap-4 h-fit">
        <div className="">
          {/* input for host  */}

          <input
            value={input}
            className=" rounded-lg p-2 text-sm"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the host name"
          />
        </div>
        <div>
          {/* input type (dropdown) menu*/}
          <DropdownMenuRadioGroupDemo />
        </div>
        <div>
          {!currRecord ? null : (
            <Button
              onClick={() => handleSubmit()}
              variant="secondary"
            >
              SUBMIT
            </Button>
          )}
        </div>
      </div>
      <div className=" mt-5 items-center px-20">
        {/* Going to display the content that is saved on server on a table of shadcn */}
        <TableDisplay />
      </div>
    </div>
  );
};

export default HomePage;

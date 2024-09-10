"use client";
import {DropdownMenuRadioGroupDemo} from "./menu/Dropdown";
import {Button} from "@/components/ui/button";
import useStore from "@/store/Auth";
import axios from "axios";
import {useState} from "react";

export default function Home() {
  const currRecord = useStore((state) => state.record);
  const [input, setInput] = useState("");
  function handleSubmit() {
    console.log(currRecord, "HHHHHH", input);
    const sent = axios.post(
      "http://localhost:3000/api/add-data",
      {
        hostName: input,
        recordType: currRecord,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // current record and input to send over axios
  }
  return (
    <div className=" md:flex md:items-center sm:justify-center grid place-items-center grid-cols-1 gap-4 h-screen">
      <div className=" ">
        {/* input */}

        <input
          value={input}
          className=" rounded-lg p-2 text-sm"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter the host name"
        />
      </div>
      <div>
        {/* type (dropdown) */}
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
  );
}

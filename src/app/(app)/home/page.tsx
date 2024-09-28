"use client";
import React, {useEffect, useState} from "react";
import {DropdownMenuRadioGroupDemo} from "@/app/menu/Dropdown";
import {Button} from "@/components/ui/button";
import useStore from "@/store/Auth";
import axios from "axios";
import {useUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
// import {auth} from "@clerk/nextjs/server";
// import {currentUser} from "@clerk/nextjs/server";

const HomePage = () => {
  const {isSignedIn, user} = useUser();
  const [input, setInput] = useState("");
  const currRecord = useStore((state) => state.record);

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  async function handleSubmit() {
    console.log(currRecord, "HHHHHH", input, user?.id);
    try {
      const sendData = await axios.post(
        "http://localhost:3000/api/add-data",
        {
          hostName: input,
          recordType: currRecord,
          id: user?.id,
          // userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
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
        {/* <Button onClick={() => submitButnon()}>
          Add user (button for testing)
        </Button> */}
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
};

export default HomePage;

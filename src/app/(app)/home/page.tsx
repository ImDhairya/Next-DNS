"use client";
import React, {useState} from "react";
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
  if (!isSignedIn) {
    redirect("/sign-in");
  }
  toSeeIsUserPresentOnDB();
  console.log(user, "Lets see what details i get of users");

  async function toSeeIsUserPresentOnDB() {
    const id = user?.id;
    const userOnDb = await axios.post(
      "http://localhost:3000/api/get-user",
      id,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SHIT GONE SOUTH ", userOnDb.data.success);

    if (userOnDb.data.success) {
      console.log("User there YAAAAAAAAAAAAAAYAAYAYAYAA");
    } else {
      // send data to the database call the function that sends data over the db
      console.log("User not there NNAAAAAAAAAAAAANANANNANANAAAA");
      await submitButnon();
    }
  }

  const currRecord = useStore((state) => state.record);
  const [input, setInput] = useState("");
  function handleSubmit() {
    console.log(currRecord, "HHHHHH", input, user?.id);
    const sendData = axios.post(
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
  }

  function submitButnon() {
    const sendUser = axios.post("http://localhost:3000/api/add-user", {
      id: user?.id,
      username: user?.username,
      fullName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    // current record and input to send over axios
    // Now sending user details over axios to create user if doesnot exists and just add if already exists {id, username, fullName, email}
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
        <Button onClick={() => submitButnon()}>
          Add user (button for testing)
        </Button>
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

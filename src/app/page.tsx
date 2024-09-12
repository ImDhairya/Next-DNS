"use client";
import {DropdownMenuRadioGroupDemo} from "./menu/Dropdown";
import {Button} from "@/components/ui/button";
import useStore from "@/store/Auth";
import axios from "axios";
import {useState} from "react";
import HomePage from "./(app)/home/page";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

"use client";
import {useRef} from "react";
import * as React from "react";
import useStore from "@/store/Auth";
import {Button} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("");
  const ref = useRef(position);
  const currRecord = useStore((state) => state.record);
  const updatedRecords = useStore((state) => state.updatedRecords);

  function handleChange(newRecord: string) {
    // const record = useStore((state) => state.record);
    updatedRecords(newRecord);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className=" bg-green-700"
      >
        <Button variant="outline">
          {!position ? "Select Type" : position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-700">
        <DropdownMenuLabel className=" flex justify-center">
          Record Type
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          // onChange={() => handleChange(position)}
          onValueChange={(newValue) => {
            setPosition(newValue);
            handleChange(newValue);
          }}
        >
          <DropdownMenuRadioItem value="A RECORD">
            A RECORD
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="CNAME RECORD">
            CNAME RECORD
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="NS RECORD">
            NS RECORD
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

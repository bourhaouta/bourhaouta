"use client";

import Button from "./Button";
import Icon from "./Icon";

// Opens the print dialog, where "Save as PDF" gives a PDF of the page
export default function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()}>
      <Icon name="download" />
      <span className="ml-2">Save as PDF</span>
    </Button>
  );
}

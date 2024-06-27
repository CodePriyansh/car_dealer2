import * as React from "react";
import Drawer from "@mui/material/Drawer";

export default function FilterDrawer({ setOpenDrawer, openDrawer }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setIsOpen(open);
      setOpenDrawer(open)
    };

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
          <div className="flex w-screen justify-between p-8">
            <p>drawer content</p>
            <p onClick={toggleDrawer(false)}>close</p>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

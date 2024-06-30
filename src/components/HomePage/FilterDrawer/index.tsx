import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@/components/Common/Button";
import styles from './styles.module.css'

export default function FilterDrawer({ setOpenDrawer, openDrawer }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setIsOpen(open);
      setOpenDrawer(open);
    };

  const contentData = [
    {
      filterName: "Price Range",
      filters: [
        "Under ₹2 Lakh",
        "₹2 Lakh - ₹3 Lakh",
        "₹3 Lakh - ₹5 Lakh",
        "₹5 Lakh - ₹8 Lakh",
        "₹8 Lakh - ₹10 Lakh",
        "Above ₹10 Lakh",
      ],
    },
    {
      filterName: "Brand",
      filters: [
        "Maruti Suzuki",
        "Hyundai",
        "Tata Motors",
        "Honda",
        "Toyota",
        "Mahindra",
        "Kia",
        "Ford",
        "Volkswagen",
        "Skoda",
      ],
    },
    {
      filterName: "Variant",
      filters: ["Renault Kwid", "Datsun Redi-GO", "Maruti Suzuki S-Presso"],
    },
    {
      filterName: "color",
      filters: [
        "Red",
        "Blue",
        "Black",
        "White",
        "Silver",
        "Grey",
        "Green",
        "Yellow",
        "Brown",
        "Orange",
      ],
    },
  ];

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
          <div className={styles.wrapper}>
            <div className={styles.top_row}>
              <p onClick={toggleDrawer(false)}>close</p>
            </div>

            <div className={styles.content_wrapper}>
              {contentData?.map((item, index) => {
                return (
                  <div
                    key={index.toString()}
                    className={styles.container}
                  >
                    <div className={styles.filter_heading}>
                      {item?.filterName}
                    </div>
                    <div className={styles.filter_ele_wrapper}>
                      {item.filters?.map((ele, ind) => {
                        return (
                            <div
                              key={ind.toString()}
                              className="flex items-center space-x-2"
                            >
                              <div className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  //   checked={checked}
                                  //   onChange={onChange}
                                />
                                <span className="checkmark"></span>
                              </div>
                              <span className={styles.element}>
                                {ele}
                              </span>
                            </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button otherStyles="py-2">Apply</Button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

import React, { useEffect } from "react";
import DrugItem from "../../Drug/DrugItem/DrugItem";
import { Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPrescriptionDetailByIdApi } from "../../../features/prescription/prescriptionSlice";

const PrescriptionItem = () => {
  const { prescriptionDetail } = useSelector((state) => state.prescription);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrescriptionDetailByIdApi(2));
  }, [dispatch]);

  // console.log(prescriptionDetail[0]?.pres_id);
  return (
    <div className="my-3">
      <span>Mã toa thuốc {prescriptionDetail?.pres_id}</span>
      <Card className="w-100">
        <div className="row">
          {/* <div className="col-12 col-md-12 col-lg-12">
            <DrugItem />
          </div>
          <div className="col-12 col-md-12 col-lg-12">
            <DrugItem />
          </div>
          <div className="col-12 col-md-12 col-lg-12">
            <DrugItem />
          </div> */}
          {prescriptionDetail?.map((item) => (
            <div className="col-12 col-md-12 col-lg-12">
              <DrugItem item={item} key={item.id} />
            </div>
          ))}
        </div>
        <div className="row text-end">
          <div className="text-end">
            <Button className="w-25 mx-1">Mua Lại</Button>
            <Button className="w-25 mx-1" type="primary">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionItem;

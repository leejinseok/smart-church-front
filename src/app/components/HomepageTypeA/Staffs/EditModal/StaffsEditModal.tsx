import "./StaffsEditModal.scss";

import { useEffect, useState } from "react";
import {
  ChurchStaff,
  ChurchStaffs,
} from "../../../../../type/homepage/homepage-type-a";
import Sortable from "sortablejs";
import StaffEditModal from "./StaffEditModal";
import { getCookie } from "../../../../../util/cookie-utils";
import DragpanIcon from "../../../../../components/Icon/DragpanIcon";
import EditIcon from "../../../../../components/Icon/EditIcon";
import TrashIcon from "../../../../../components/Icon/TrashIcon";
import CheckIcon from "../../../../../components/Icon/CheckIcon";
import { homepageTypeAApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import CloseIcon from "../../../../../components/Icon/CloseIcon";
import EditModalWrapper from "../../../Modal/EditModalWrapper";

export default function StaffsEditModal({
  churchStaffs,
  hide,
  updateStaffs,
}: {
  churchStaffs: ChurchStaffs;
  hide: () => void;
  updateStaffs: (churchStaffs: ChurchStaffs) => void;
}) {
  const [churchStaffsState, setChurchStaffsState] = useState(
    JSON.parse(JSON.stringify(churchStaffs)) as ChurchStaffs,
  );

  const [staffEditModal, setStaffEditModal] = useState({
    visible: false,
    groupIndex: null as null | number,
    staff: null as null | ChurchStaff,
    staffIndex: null as null | number,
  });

  useEffect(() => {
    const staffsTableElement = document.querySelector(
      "#staffs-table-tbody",
    ) as HTMLElement;
    if (staffsTableElement) {
      new Sortable(staffsTableElement, {
        handle: ".handle",
      });
    }
  }, []);

  const removeStaff = (groupIndex: number, staffIndex: number) => {
    const newValue = { ...churchStaffsState };
    newValue.groups[groupIndex].staffs.splice(staffIndex, 1);

    setChurchStaffsState(newValue);
  };

  const handleSubmit = async () => {
    const homepageUuid = getCookie("homepageUuid");
    if (!homepageUuid) {
      return;
    }

    const tableRowsElement = document.querySelectorAll(
      "#staffs-table-tbody tr",
    );

    if (!tableRowsElement) {
      return;
    }

    const newChurchStaffs = { ...churchStaffs };

    const sorted = [];
    for (let i = 0; i < tableRowsElement.length; i++) {
      const tableRow = tableRowsElement[i];
      const dataIndex = tableRow.getAttribute("data-index");
      sorted.push(churchStaffsState.groups[0].staffs[+dataIndex!]);
    }
    newChurchStaffs.groups[0].staffs = sorted;

    const userUuid = getCookie("userUuid");
    await homepageTypeAApiRepository.updateHomepage(
      homepageUuid,
      userUuid || "",
      {
        churchStaffs: newChurchStaffs,
      },
    );

    updateStaffs(newChurchStaffs);
    hide();
  };
  return (
    <>
      <EditModalWrapper
        id="churchstaffs-edit-modal"
        className="modal-container edit-modal"
        onClick={hide}
      >
        <div className="modal__header">
          <h3 className="font-size-l font-weight-bold">섬기는 사람들 편집</h3>
        </div>

        <div className="modal__body">
          <div className="form-group">
            <p
              className="font-weight-bold font-size-m"
              style={{ marginBottom: 0 }}
            >
              제목
            </p>

            <input
              type="text"
              className="font-size-m no-border"
              value={churchStaffsState.title}
              onChange={(e) =>
                setChurchStaffsState((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <p
              className="font-weight-bold font-size-m"
              style={{ marginBottom: 12 }}
            >
              항목
            </p>

            <div>
              <table className="width-100">
                <thead>
                  <tr className="header">
                    <th>이름</th>
                    <th>사진</th>
                    <th>역할</th>
                    <th>부서</th>
                    <th>이메일</th>
                    <th>설정</th>
                  </tr>
                </thead>

                <tbody id="staffs-table-tbody">
                  {churchStaffsState.groups[0].staffs.map(
                    (staff, staffIndex) => {
                      return (
                        <tr key={staffIndex} data-index={staffIndex}>
                          <td>{staff.name}</td>
                          <td>
                            <img
                              className="profile-img"
                              src={staff.profileImageUrl || ""}
                              alt=""
                            />
                          </td>
                          <td>{staff.role || "-"}</td>
                          <td>{staff.department || "-"}</td>
                          <td>{staff.email || "-"}</td>
                          <td>
                            <div className="nowrap button-container d-flex">
                              <button
                                type="button"
                                className="button-4 handle d-flex align-items-center"
                              >
                                <span>이동</span>
                                <DragpanIcon maxWidth={18} fill="#888" />
                              </button>
                              <button
                                type="button"
                                className="button-4  d-flex align-items-center "
                                onClick={() => {
                                  setStaffEditModal({
                                    visible: true,
                                    groupIndex: 0,
                                    staff: staff,
                                    staffIndex: staffIndex,
                                  });
                                }}
                              >
                                <span>편집</span>
                                <EditIcon maxWidth={18} fill="#888" />
                              </button>
                              <button
                                type="button"
                                className="button-4  d-flex align-items-center"
                                onClick={() => {
                                  removeStaff(0, staffIndex);
                                }}
                              >
                                <span>삭제</span>
                                <TrashIcon maxWidth={18} fill="#888" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>

              <div
                className="text-align-right"
                style={{
                  marginTop: 12,
                }}
              >
                <button
                  className="button-4"
                  onClick={() => {
                    setStaffEditModal({
                      visible: true,
                      groupIndex: 0,
                      staff: {
                        name: "",
                        department: "",
                        description: "",
                        email: "",
                        profileImageUrl: "",
                        role: "",
                        tel: "",
                      },
                      staffIndex: null,
                    });
                  }}
                >
                  추가+
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal__footer text-align-right">
          <button
            type="button"
            className="button-4 cancel"
            onClick={hide}
            style={{
              marginRight: 4,
            }}
          >
            취소
            <CloseIcon maxWidth={18} />
          </button>
          <button
            type="button"
            className="button-4 submit"
            onClick={() => handleSubmit()}
          >
            적용
            <CheckIcon maxWidth={18} />
          </button>
        </div>
      </EditModalWrapper>

      {staffEditModal.visible && (
        <StaffEditModal
          staff={staffEditModal.staff!}
          staffIndex={staffEditModal.staffIndex!}
          updateStaff={(staff) => {
            const newValue = { ...churchStaffsState };

            if (!staffEditModal.staffIndex) {
              newValue.groups[staffEditModal.groupIndex!].staffs.push({
                ...staff,
              });
            } else {
              newValue.groups[staffEditModal.groupIndex!].staffs[
                staffEditModal.staffIndex!
              ] = { ...staff };
            }
            setChurchStaffsState(newValue);
          }}
          hide={() =>
            setStaffEditModal({
              visible: false,
              groupIndex: null,
              staff: null,
              staffIndex: null,
            })
          }
        />
      )}
    </>
  );
}

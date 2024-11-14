import "./StaffsEditModal.scss";

import { useEffect, useState } from "react";
import {
  ChurchStaff,
  ChurchStaffs,
} from "../../../../../type/homepage/homepage-type-a";
import Sortable from "sortablejs";
import StaffEditModal from "./StaffEditModal";
import { homepageTypeAMockApiRepository } from "../../../../../repository/homepage-type-a/homepage-type-a-api-repository";
import { getCookie } from "../../../../../util/cookie-utils";

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
        onChange: (evt) => {
          console.log(evt);
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
        },
      });
    }
  }, []);

  const removeStaff = (groupIndex: number, staffIndex: number) => {
    const newValue = { ...churchStaffsState };
    newValue.groups[groupIndex].staffs.splice(staffIndex, 1);

    setChurchStaffsState(newValue);
  };

  const handleSubmit = async () => {
    const homepageTypeAId = getCookie("homepageTypeAId");
    if (!homepageTypeAId) {
      return;
    }

    await homepageTypeAMockApiRepository.updateChurchStaffs(
      homepageTypeAId,
      churchStaffsState,
    );
    updateStaffs({ ...churchStaffsState });
    hide();
  };
  return (
    <>
      <div
        id="churchstaffs-edit-modal"
        className="modal-container edit-modal"
        onClick={hide}
      >
        <div className="modal__inner">
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="font-size-l font-weight-bold">
                섬기는 사람들 편집
              </h3>
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
                            <tr key={staffIndex}>
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
                                <div className="nowrap button-container">
                                  <button
                                    type="button"
                                    className="button-4 handle"
                                  >
                                    이동
                                  </button>
                                  <button
                                    type="button"
                                    className="button-4"
                                    onClick={() => {
                                      setStaffEditModal({
                                        visible: true,
                                        groupIndex: 0,
                                        staff: staff,
                                        staffIndex: staffIndex,
                                      });
                                    }}
                                  >
                                    편집
                                  </button>
                                  <button
                                    type="button"
                                    className="button-4"
                                    onClick={() => {
                                      removeStaff(0, staffIndex);
                                    }}
                                  >
                                    삭제
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
            <div className="modal__footer">
              <button
                type="button"
                className="button-4 width-100"
                onClick={() => handleSubmit()}
              >
                적용
              </button>
            </div>
          </div>
        </div>
      </div>

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

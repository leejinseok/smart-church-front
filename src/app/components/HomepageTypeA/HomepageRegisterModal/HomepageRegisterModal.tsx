import "./HomepageRegisterModal.scss";

import { useRecoilState } from "recoil";
import { homepageRegisterModalState } from "../../../../atom/ui";
import { useEffect, useState } from "react";
import {
  getChurchAdminAccessTokenCookie,
  getCookie,
  setChurchAdminAccessTokenCookie,
} from "../../../../util/cookie-utils";
import {
  ChurchRequest,
  ChurchResponse,
} from "../../../../api/smart-church/smart-church-api-response";
import ApplyButton from "../../../../components/common/ApplyButton";
import { openDaumPostCode } from "../../../../util/map-utils";
import { authApiRepository } from "../../../../repository/smart-church/smart-church-auth-api-repository";
import { SmartChurchHttpError } from "../../../../type/smart-church-api-type";
import { HomepageTypeAResponse } from "../../../../type/homepage/homepage-type-a";
import { smartChurchChurchApiRepository } from "../../../../repository/smart-church/smart-church-church-api-repository";
import { homepageTypeAApiRepository } from "../../../../repository/homepage-type-a/homepage-type-a-api-repository";

export default function HomepageRegisterModal({
  homepage,
  church,
}: {
  homepage: HomepageTypeAResponse;
  church: ChurchResponse;
}) {
  const [, setHomepageRegisterModal] = useRecoilState(
    homepageRegisterModalState,
  );
  const mode =
    homepage.ownerUuid && homepage.churchUuid ? "UPDATE" : "REGISTER";

  const [homepageState, setHomepageState] = useState(
    JSON.parse(JSON.stringify(homepage)) as HomepageTypeAResponse,
  );

  const [churchState, setChurchState] = useState<ChurchRequest | null>();
  const [userForm, setUserForm] = useState({
    email: "",
    emailVerified: false,
    emailVerificationCode: "",
    password: "",
  });

  useEffect(() => {
    setUserForm((prev) => ({
      ...prev,
      emailVerified: false,
      emailVerificationCode: "",
    }));
  }, [userForm.email]);

  useEffect(() => {
    const churchTemporaryCookie = getCookie("churchTemporary");
    if (churchTemporaryCookie) {
      const churchTemporary = JSON.parse(
        decodeURIComponent(churchTemporaryCookie),
      ) as ChurchResponse;
      setChurchState(churchTemporary);
    } else {
      setChurchState(church);
    }
  }, [church]);

  useEffect(() => {
    if (homepageState.homepageInformations.homepageTitle) {
      return;
    }

    setHomepageState((prev) => ({
      ...prev,
      homepageInformations: {
        ...prev.homepageInformations,
        homepageTitle: churchState?.name || "",
      },
    }));
  }, [churchState?.name, homepageState.homepageInformations.homepageTitle]);

  const handleAddressClick = async () => {
    if (!churchState) {
      return;
    }

    try {
      const result = await openDaumPostCode();
      const { latitude, longitude, address } = result;
      setChurchState((prev) => ({ ...prev!, latitude, longitude, address }));
    } catch (err) {
      alert("주소정보를 불러올 수 업습니다");
    }
  };

  const handleChangeHomepageTitle = (value: string) => {
    setHomepageState((prev) => ({
      ...prev,
      homepageInformations: {
        ...prev.homepageInformations,
        homepageTitle: value,
      },
    }));
  };

  const handleClickSendEmailVerifyCode = async () => {
    try {
      await authApiRepository.sendEmailVerifyCode(userForm.email);
      alert("인증번호를 전송하였습니다. 이메일을 확인해주세요");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickEmailVerifyCode = async () => {
    try {
      const res = await authApiRepository.verifyEmail(
        userForm.email,
        userForm.emailVerificationCode,
      );

      if (res.status === 200) {
        setUserForm((prev) => ({ ...prev, emailVerified: true }));
      }
      if (res.status >= 400) {
        const error = JSON.parse(await res.text()) as SmartChurchHttpError;
        alert("인증번호가 일치하지 않습니다");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeUserEmail = (value: string) => {
    setUserForm((prev) => ({ ...prev, email: value }));
  };

  const handleCreateHomepageClick = async () => {
    let { ownerUuid, churchUuid } = homepage;
    const { uuid: homepageUuid } = homepage;

    // homepage 정보에 ownerUuid가 없다면 현재 회원가입을 안한 상태라는 것
    if (!ownerUuid) {
      if (!userForm.emailVerified) {
        alert("이메일을 인증해주세요");
        return;
      }

      if (!userForm.password) {
        alert("비밀번호를 입력해주세요");
        return;
      }

      const { email, password } = userForm;
      const res = await authApiRepository.register(email, password);
      const json = await res.json();
      if (res.status >= 400) {
        alert(json.message);
        return;
      }

      ownerUuid = json.uuid;
      setChurchAdminAccessTokenCookie(json.accessToken);
      setChurchState((prev) => {
        if (!prev) {
          return;
        }

        return {
          ...prev,
          ownerId: json.id,
        };
      });
    }

    const churchAdminAccessToken = getChurchAdminAccessTokenCookie();

    // 교회 정보 등록 or 수정
    if (!churchUuid) {
      // 교회 생성
      if (churchAdminAccessToken && churchState) {
        const res = await smartChurchChurchApiRepository.saveChurch(
          churchAdminAccessToken,
          churchState,
        );
        const json = await res.json();
        if (res.status >= 400) {
          alert(json.message || "문제가 발생하였습니다");
          return;
        }

        churchUuid = json.uuid;
      }
    } else {
      // 교회 정보 업데이트
      if (churchAdminAccessToken && churchState) {
        await smartChurchChurchApiRepository.updateChurch(
          churchAdminAccessToken,
          churchUuid,
          churchState,
        );
      }
    }

    // 홈페이지에 회원정보, 교회정보 업데이트
    try {
      let session = null;
      if (churchAdminAccessToken) {
        session = await authApiRepository.session(churchAdminAccessToken);
      }

      await homepageTypeAApiRepository.updateHomepage(
        homepageUuid!,
        session?.uuid || "",
        {
          ownerUuid,
          churchUuid,
          homepageInformations: {
            ...homepageState.homepageInformations,
            homepageStatus: "REGISTERED",
          },
        },
      );

      if (ownerUuid) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      id="homepage-register-modal"
      className="modal-container"
      onClick={() => setHomepageRegisterModal({ visible: false })}
    >
      <div className="modal__inner" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>홈페이지 {mode === "REGISTER" ? "생성" : "수정"}하기</h3>
        </div>
        <div className="modal__body">
          {!homepage.ownerUuid && (
            <div className="modal__body__group">
              <h4 className="font-size-m">회원정보</h4>
              <div className="modal__body__form">
                <div className="modal__body__form__group">
                  <label htmlFor="">이메일</label>
                  <div className="d-flex">
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) => handleChangeUserEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className="button-4 border-radius-0"
                      style={{ marginLeft: 4 }}
                      onClick={handleClickSendEmailVerifyCode}
                    >
                      인증번호 전송
                    </button>
                  </div>
                </div>

                {!userForm.emailVerified && (
                  <div className="modal__body__form__group">
                    <label htmlFor="">인증번호</label>

                    <div className="d-flex">
                      <input
                        type="number"
                        value={userForm.emailVerificationCode}
                        onChange={(e) =>
                          setUserForm((prev) => ({
                            ...prev,
                            emailVerificationCode: e.target.value,
                          }))
                        }
                      />
                      <button
                        type="button"
                        className="button-4 border-radius-0"
                        style={{ marginLeft: 4 }}
                        onClick={handleClickEmailVerifyCode}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                )}

                <div className="modal__body__form__group">
                  <label htmlFor="">패스워드</label>
                  <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="modal__body__group">
            <h4 className="font-size-m">홈페이지 정보</h4>
            <div className="modal__body__form">
              <div className="modal__body__form__group">
                <label htmlFor="">홈페이지 주소</label>
                <input
                  type="text"
                  value={homepageState?.homepageInformations?.subdomain || ""}
                />
              </div>

              <div className="modal__body__form__group">
                <label htmlFor="">홈페이지 타이틀</label>
                <input
                  type="text"
                  value={
                    homepageState?.homepageInformations?.homepageTitle || ""
                  }
                  onChange={(e) => handleChangeHomepageTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <div className="modal__body__group">
            <h4 className="font-size-m">교회정보</h4>
            <div className="modal__body__form">
              <div className="modal__body__form__group">
                <label htmlFor="">이름</label>
                <input type="text" value={churchState?.name} />
              </div>
              <div className="modal__body__form__group">
                <label htmlFor="">주소</label>
                <div>
                  <input
                    type="text"
                    value={churchState?.address}
                    readOnly
                    onClick={handleAddressClick}
                  />
                </div>
                <div>
                  <input type="text" value={churchState?.addressDetail || ""} />
                </div>
              </div>
              <div className="modal__body__form__group">
                <label htmlFor="">연락처</label>
                <input type="text" value={churchState?.tel || ""} />
              </div>
            </div>
          </div> */}
        </div>
        <div className="modal__footer text-align-right">
          <ApplyButton
            handleClick={handleCreateHomepageClick}
            text={mode === "REGISTER" ? "생성" : "수정"}
          />
        </div>
      </div>
    </div>
  );
}

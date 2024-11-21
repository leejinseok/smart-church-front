import { HomepageTypeAResponse } from "./homepage-type-a";

export const homepageTypeADefault: HomepageTypeAResponse = {
  id: null,
  uuid: null,
  churchLogo: {
    type: "LOGO_AND_CHURCH_NAME",
    image: "https://placehold.co/50x50?text=Logo",
  },
  banners: {
    visible: true,
    items: [
      {
        id: 0,
        imageUrl: "https://placehold.co/1236x500?text=Banner Image",
        order: 0,
      },
      {
        id: 1,
        imageUrl: "https://placehold.co/1236x500?text=Banner Image",
        order: 1,
      },
    ],
  },
  churchDepartmentsAndMinistries: {
    title: "사역 및 부서소개",
    visible: true,
    items: [
      {
        id: 1,
        name: "부서1",
        description:
          "국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을 받아 행정각부를 통할한다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 나는 헌법을 준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다.",
      },
      {
        id: 2,
        name: "부서2",
        description:
          "대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며, 재판관은 대통령이 임명한다. 중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다.",
      },
      {
        id: 3,
        name: "부서3",
        description:
          "선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당 또는 후보자에게 부담시킬 수 없다. 헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다. 공무원인 근로자는 법률이 정하는 자에 한하여 단결권·단체교섭권 및 단체행동권을 가진다. 대통령은 필요하다고 인정할 때에는 외교·국방·통일 기타 국가안위에 관한 중요정책을 국민투표에 붙일 수 있다.",
      },
    ],
  },
  churchIntro: {
    title: "교회소개",
    contents: [
      {
        insert: `스마트 교회는 예수 그리스도의 복음을 가장 중요한 가치로 삼고, 그분의 가르침을 따라 살아가는 공동체입니다. 
우리는 모든 세대와 모든 사람들을 환영하며, 복음의 메시지가 일상의 삶 속에서 실현될 수 있도록 돕습니다. 
전통적 신앙의 깊이와 현대적 접근 방식을 결합하여, 교회의 모든 사역과 활동은 하나님의 사랑을 전하고 이웃을 섬기는 데 중점을 둡니다.

스마트 교회는 예배뿐만 아니라 소그룹 모임, 교육, 봉사활동을 통해 삶 속에서 복음의 능력을 체험하며, 함께 성장하고 변화되는 교회를 지향합니다. 
우리의 문은 항상 열려 있으며, 주님의 은혜를 나누기 위해 기도와 헌신으로 함께 나아가고 있습니다.

- 담임목사 김스마트
      `,
      },
    ],
  },
  churchRegisterGuide: [
    {
      insert: `1. 새가족 등록 절차
      1) 예배 참석
      스마트 교회의 주일예배에 참석해 주시길 바랍니다. 예배는 매주 주일 오전 10시와 오후 2시에 진행됩니다. 예배 후, 새가족을 위한 환영 시간이 마련되어 있으니 꼭 함께해 주세요.

      2) 새가족 등록 카드 작성
      예배 후, 안내 데스크에서 새가족 등록 카드를 작성해 주십시오. 등록 카드를 작성해 주시면 담당 교역자나 새가족 담당자가 연락드려, 교회 생활과 프로그램에 대해 자세히 안내해 드립니다.

      3) 새가족 환영 모임 참석
      등록을 마치신 후에는 새가족 환영 모임에 참여하게 됩니다. 이 모임에서는 교회의 역사, 비전, 예배 시간 및 다양한 교회 활동에 대한 안내가 이루어지며, 교역자들과 함께 이야기를 나누는 시간도 갖습니다.

      2. 새가족 교육 및 수료
      1) 새가족 교육 프로그램
      새가족 등록 후, 4주 동안 진행되는 새가족 교육 프로그램에 참여해 주십시오. 이 교육에서는 기독교의 기본 교리, 교회의 사명, 그리고 신앙 생활의 기본에 대해 배우게 됩니다. 교육은 매주 주일 오후 3시에 교회 교육관에서 진행됩니다.

      2) 수료 기준
      새가족 교육은 총 4주 과정으로, 4회 모두 출석하셔야 수료가 가능합니다. 특별한 사정으로 교육에 참석하지 못한 경우, 담당 교역자에게 미리 알려주시기 바랍니다. 교육을 마친 후에는 수료증이 수여되며, 정식으로 교회의 한 가족으로 환영받게 됩니다.

      3. 새가족 담당 교역자와의 만남
      새가족 등록 후, 한 번의 개별 면담을 통해 신앙 상담 및 교회 생활에 대해 더 깊은 이야기를 나눌 수 있습니다. 면담을 통해 교회에서의 섬김과 봉사, 소그룹 활동 참여 등에 대해 안내를 받으실 수 있습니다.

      4. 새가족 정착을 위한 지원
      스마트 교회는 새가족들이 교회 생활에 잘 적응할 수 있도록 다양한 지원을 제공합니다.

      새가족 소그룹 배정: 비슷한 연령대 및 관심사를 가진 소그룹에 배정되어 더 깊은 교제를 나눌 수 있습니다.
      교회 행사 초대: 교회의 주요 행사 및 프로그램에 초대하여 함께 교제하는 시간을 갖습니다.
    `,
      attributes: {},
    },
  ],
  gallery: {
    title: "갤러리",
    items: [
      {
        imageUrl: "https://placehold.co/610x380?text=Gallery Image",
        description:
          "국가는 농업 및 어업을 보호·육성하기 위하여 농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야 한다.",
      },
      {
        imageUrl: "https://placehold.co/610x380?text=Gallery Image",
        description:
          "근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다. 재판의 전심절차로서 행정심판을 할 수 있다.",
      },
    ],
  },
  churchStaffs: {
    title: "섬기는 사람들",
    groups: [
      {
        type: "NONE",
        staffs: [
          {
            name: "김스마트",
            role: "담임목사",
            description: `
            학력
            감리교 신학대학교 졸업
            감리교 신학대학원 졸업

            집필
            미주크리스챤 저널: “소 그룹 리더의 영적 치유” 필자 (2003-‘06.1, 2010)
          `,
            email: "kim@smart-church.com",
            tel: "010-1004-1004",
            profileImageUrl: "https://placehold.co/292x250?text=Staff Image",
            department: null,
          },
          {
            name: "박스마트",
            role: "부목사",
            description: "",
            email: "park@smart-church.com",
            tel: "",
            profileImageUrl: "https://placehold.co/292x250?text=Staff Image",
            department: "아동부",
          },
          {
            name: "홍스마트",
            role: "부목사",
            description: "",
            email: "park@smart-church.com",
            tel: "010-1004-1004",
            profileImageUrl: "https://placehold.co/292x250?text=Staff Image",
            department: "선교부",
          },
          {
            name: "유스마트",
            role: "부목사",
            description: "",
            email: "park@smart-church.com",
            tel: "010-1004-1004",
            profileImageUrl: "https://placehold.co/292x250?text=Staff Image",
            department: "교육부",
          },
        ],
      },
    ],
  },
  videos: {
    visible: true,
    title: "설교영상",
    page: {
      currentPage: 0,
      totalPages: 1,
      size: 10,
      totalElements: 2,
      sort: "createdAt,DESC",
      last: true,
      next: false,
      data: [
        {
          // url: "https://www.youtube.com/watch?v=aXqdQ2cj2sQ",
          url: "https://www.youtube.com/watch?v=c21QZnQtGqo",
          order: 0,
        },
        {
          // url: "https://www.youtube.com/watch?v=ivtOmQ2zcDU",
          url: "https://www.youtube.com/watch?v=c21QZnQtGqo",
          order: 1,
        },
      ],
    },
  },
  worshipServicesAndMeetings: {
    title: "예배 및 모임안내",
    groups: [
      {
        groupName: "예배",
        items: [
          {
            name: "주일 1부예배",
            time: "오전 8시 30분",
            location: "본당 (지하 2층)",
          },
          {
            name: "주일 2부예배",
            time: "오전 11시 30분",
            location: "본당 (지하 2층)",
          },
          {
            name: "주일 3부예배",
            time: "오후 2시",
            location: "본당 (지하 2층)",
          },
          {
            name: "젊은이부 예배",
            time: "주일 오후 2시",
            location: "벧엘성전 (4층)",
          },
          {
            name: "수요예배",
            time: "오후 7시 30분",
            location: "본당 (지하2층)",
          },
          {
            name: "금요예배",
            time: "오후 9시",
            location: "본당 (지하2층)",
          },
          {
            name: "새벽예배",
            time: "매일 오전 5시",
            location: "본당 (지하2층)",
          },
        ],
      },
    ],
  },
};

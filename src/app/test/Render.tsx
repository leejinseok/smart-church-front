import { useEffect, useState } from "react";

interface Member {
  id: number;
  name: string;
}

export default function Render({ member }: { member: Member }) {
  const [memberState, setMemberState] = useState<Member>();
  useEffect(() => {
    setMemberState(member);
  }, [member]);
  return (
    <div>
      <span>{memberState?.id}</span>
      <span>{memberState?.name}</span>
    </div>
  );
}

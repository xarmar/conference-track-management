import Talk from "../Talk";

interface listOfTalksProps {
  arrayOfTalks: Talk[];
  session: string;
}

const ListOfTalks = (props: listOfTalksProps) => {
  const arrayOfTalks: Talk[] = props.arrayOfTalks;
  const session: string = props.session;
  let className: string;

  if (session === "morning") {
    className = "morning-talk-container";
  } else {
    className = "afternoon-talk-container";
  }

  // Map arrayOfTracks to return an new array of divs that contain Talk Components
  const talksList = arrayOfTalks.map((talk) => (
    <div key={talk.id} className={className}>
      <Talk talk={talk} />
    </div>
  ));

  return <>{[talksList]}</>;
};

export default ListOfTalks;

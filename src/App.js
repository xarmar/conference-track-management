import './App.css';
import Conference from './components/Conference';
import Talk from './components/Talk';

function App() {

  const dummyConference = new Conference([], null);
  const dummyTalk = new Talk (60, 'ola asd bem', false, null);
  const dummyTalktwo = new Talk (60, 'ola dsa bem', false, null);
  const dummyTalkthree = new Talk (60, 'ola tudo bem', false, null);

  const talks = [dummyTalk, dummyTalktwo, dummyTalkthree];

  dummyConference.buildTrackList(talks);

  return (
    <div className="App">
      <Conference conference={dummyConference}/>
    </div>
  );
}

export default App;

import Workspace from "./features/workspace";

function App(): JSX.Element {
  // const ipcHandle = (): void => {
  //   window.electron.ipcRenderer.send("ping");
  // };

  return (
    <div className="w-screen h-screen rounded-[10px] overflow-hidden flex flex-col items-center  text-black">
      <Workspace></Workspace>
    </div>
  );
}

export default App;

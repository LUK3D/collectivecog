import DraggableArea from "./components/DraggableArea";

function App(): JSX.Element {
  const ipcHandle = (): void => {
    window.electron.ipcRenderer.send("ping");
  };

  return (
    <div className="w-screen h-screen bg-white rounded-lg flex flex-col items-center  text-black">
      <DraggableArea className="w-full h-[48px] flex p-4 ">
        <div className="no-drag">
          <p className="text-lg font-bold">Hello Coog</p>
        </div>
      </DraggableArea>
      <button
        onClick={ipcHandle}
        className="text-black border px-3 py-2 rounded-lg shadow-md"
      >
        Ping
      </button>
    </div>
  );
}

export default App;

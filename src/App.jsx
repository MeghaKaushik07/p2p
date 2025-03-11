import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";

export default function FileSharingApp() {
  const [peerId, setPeerId] = useState("");
  const [connections, setConnections] = useState([]); // Track active connections
  const [peer, setPeer] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on("open", (id) => {
      setPeerId(id);
    });

    newPeer.on("connection", (newConn) => {
      if (connections.length >= 2) {
        newConn.close(); // Reject extra connection
        alert("Room is full!");
        return;
      }

      setConnections((prev) => [...prev, newConn]);

      newConn.on("data", (data) => {
        if (data.file) {
          setReceivedFile(data);
        }
      });
    });

    setPeer(newPeer);
  }, [connections]); // Dependency added to track connections

  const createConnection = () => {
    alert("Waiting for another system to join. Share this ID: " + peerId);
  };

  const joinConnection = (connectionId) => {
    if (!connectionId) return alert("Enter a valid connection ID.");
    if (connections.length >= 2) return alert("Room is full!");

    const newConn = peer.connect(connectionId);
    newConn.on("open", () => setConnections((prev) => [...prev, newConn]));
    newConn.on("data", (data) => {
      if (data.file) {
        setReceivedFile(data);
      }
    });
  };

  const sendFile = () => {
    if (connections.length === 0) return alert("Not connected to any peer.");
    const file = fileInputRef.current.files[0];
    if (!file) return alert("Please select a file.");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      connections.forEach((conn) => conn.send({ file: reader.result, fileName: file.name }));
      alert("File sent!");
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Peer-to-Peer File Sharing</h2>
      <button onClick={createConnection}>Create Connection</button>
      <p>Your ID: {peerId} <button onClick={() => navigator.clipboard.writeText(peerId)}>Copy</button></p>
      <input
        type="text"
        placeholder="Enter connection ID"
        onChange={(e) => joinConnection(e.target.value)}
      />

      {connections.length > 0 && (
        <>
          <h3>Select a File</h3>
          <input type="file" ref={fileInputRef} />
          <button onClick={sendFile}>Send File</button>
        </>
      )}

      {receivedFile && (
        <>
          <p>You received a file: {receivedFile.fileName}</p>
          <a href={receivedFile.file} download={receivedFile.fileName}>
            <button>Download</button>
          </a>
        </>
      )}
    </div>
  );
}


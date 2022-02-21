import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function createroom() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [room_uri, setUri] = useState('');
  const [inputs, setInputs] = useState({
    room_name: "",
    room_members: null,

  });
  const formHandler = (e) => {
	  e.preventDefault();
	  const file = e.target[0].files[0];
	  uploadFiles(file);
  }
  const { room_name, room_members } = inputs;

  const onChange = (e) => {
    //take every input
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const createParty = async (e) => {
    e.preventDefault();
    try {
      const body = { room_uri, room_members, room_name };
      const response = await fetch("https://scb10x-assignment.herokuapp.com/room/createroom", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parseResponse = await response.json();

      router.push({ pathname: "/partyroom" });
    } catch (err) {
      console.error(err.message);
    }
  };

  const uploadFiles = (file) =>{
	  if(!file ) return;
	  const storageRef = ref(storage, `/files/${file.name}`);
	  const uploadTask = uploadBytesResumable(storageRef, file);

	  uploadTask.on("state_changed" , (snapshot) => {
		  const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);

		  setProgress(prog);

	  },(err) => console.log(err),
	  ()=>{
		  getDownloadURL(uploadTask.snapshot.ref).then(url =>  setUri(url));
		 
	  });


  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Party Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>สร้างปาร์ตี้</h1>
		<form onSubmit={formHandler}>
			<input type="file" className="input"></input>
			<button type="submit">Upload</button>
		</form>

		<h2>Uploaded {progress} %</h2>

        <form>
          <label className={styles.label1}>
            ชื่อปาร์ตี้
            <input
              className={styles.input}
              type="text"
              name="room_name"
              required="required"
              onChange={(e) => onChange(e)}
            />
          </label>
          <br></br>
          <label className={styles.label1}>
            จำนวนคนที่ขาด
            <input
              className={styles.input}
              type="text"
              name="room_members"
              required="required"
              onChange={(e) => onChange(e)}
            />
          </label>
          <br></br>
          <input
            className={styles.inputf}
            type="submit"
            value="สร้างปาร์ตี้"
            onClick={createParty}
          />
        </form>
      </main>
    </div>
  );
}

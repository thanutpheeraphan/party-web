import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { email, password } = inputs;

  const onChange = (e) => {
    //take every input
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const login = async (e) => {
    e.preventDefault();
      try {
        const body = { email, password };
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const parseResponse = await response.json();
		console.log(parseResponse);

        if (parseResponse.jwtToken) {
          localStorage.setItem("token", parseResponse.jwtToken);
          console.log("Login Successfully");
		  localStorage.setItem("userId", parseResponse.userId);
		  router.push({ pathname: "/partyroom" });
        } else {
		  alert("Invalid email or password!");
          console.log("Login Unsuccessfully");
        }
        
      } catch (err) {
        console.error(err.message);
      }
    
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Party Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Party Web</h1>

        {/* <p className={styles.description}>
          Get started by registering
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <form>
          <label className={styles.label1}>
            อีเมล
            <input
              className={styles.input}
              type="email"
              name="email"
              //   placeholder="อีเมล"
              required="required"
              //   value={email}
                onChange={(e) => onChange(e)}
            />
          </label>
          <br></br>
          <label className={styles.label1}>
            รหัสผ่าน
            <input
              className={styles.input}
              type="password"
              name="password"
              //   placeholder="รหัสผ่าน"
              required="required"
              //   value={password}
                onChange={(e) => onChange(e)}
            />
          </label>
          <br></br>
          <input
            className={styles.inputf}
            type="submit"
            value="เข้าสู่ระบบ"
            onClick={login}
          />
          <input
            className={styles.inputf}
            type="submit"
            value="สร้างบัญชีผู้ใช้"
            onClick={() => {
              router.push({
                pathname: "/register",
              });
            }}
          />
        </form>
      </main>
    </div>
  );
}

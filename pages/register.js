import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { email, password, secondpassword } = inputs;

  const onChange = (e) => {
    //take every input
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [checked, setChecked] = useState(false);

  const confirm = async (e) => {
    e.preventDefault();
    if (password != secondpassword) {
      alert("Password not matching!");
      return null;
    }

    if (checked) {
      try {
        const body = { email, password };
        const response = await fetch(
          "https://scb10x-assignment.herokuapp.com/auth/register",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const parseResponse = await response.json();

        if (parseResponse.jwtToken) {
          localStorage.setItem("token", parseResponse.jwtToken);

          console.log("Registered Successfully");
          router.push({ pathname: "/partyroom" });
        } else {
          console.log("Registered Unsuccessfully");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("กรุณายอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>สร้างบัญชีผู้ใช้</h1>
        <form>
          <label className={styles.label1}>
            อีเมล
            <input
              className={styles.input}
              type="email"
              name="email"
              required="required"
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
              required="required"
              onChange={(e) => onChange(e)}
            />
          </label>
          <br></br>
          <label className={styles.label1}>
            ยืนยันรหัสผ่าน
            <input
              className={styles.input}
              type="password"
              name="secondpassword"
              required="required"
              onChange={(e) => onChange(e)}
            />
          </label>
          <br></br>
          <input
            type="checkbox"
            id="checkbox"
            name="medium"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label>
            {" "}
            ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน
            <input
              className={styles.inputf}
              type="button"
              value="ยืนยัน"
              onClick={confirm}
            />
          </label>
          <br></br>
          <br></br>
        </form>
      </main>
    </div>
  );
}

export default Register;

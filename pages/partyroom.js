import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function partyroom({ rooms }) {
  const router = useRouter();

  const logout = (e) => {
	router.push({
        pathname: "/",
      });

  }

  const joinRoom = async (room, e) => {

    try {
      const userId = localStorage.getItem("userId");
      const room_id = room.room_id;
      let status = "Joined";
      const body = { room_id, userId, status };
      const response = await fetch("https://scb10x-assignment.herokuapp.com/room/userjoined", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parseResponse = await response.json();
      router.push({
        pathname: `/rooms/${room.room_id}`,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logout}><button onClick={(e)=>logout()} >Logout</button></div>
      <Head>
        <title>Party Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Party Rooms</h1>

        <button
          className={styles.label1}
          onClick={() => {
            router.push({
              pathname: "/createroom",
            });
          }}
        >
          Create Room
        </button>
        <div className={styles.roomsContainer}>
          {rooms?.map((room) => {
            return (
              <div className={styles.itemContainer} key={room.room_id}>
                <img className={styles.itemImg} src={room.room_uri}></img>

                <div className={styles.itemBodyContainer}>
                  <p className={styles.itemText}>{room.room_name}</p>

                  <hr className={styles.itemUnderline} />

                  <div className={styles.itemFooterContainer}>
                    <div>{`${room.active_members}/${room.room_members}`}</div>
                    <button
                      className={styles.itemBtn}
                      onClick={() => joinRoom(room)}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  //statically compiled instead of being server side rendered

  const rooms = await fetch("https://scb10x-assignment.herokuapp.com/room/getrooms").then((r) =>
    r.json()
  );

  return {
    props: {
      rooms,
    },
  };
}

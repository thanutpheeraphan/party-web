import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Character({ room }) {
  const router = useRouter();

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const userId = localStorage.getItem("userId");
        const room_id = room.room_id;
        let status = "Join";
        const body = { room_id, userId, status };
        const response = await fetch("http://localhost:5000/room/userjoined", {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const parseResponse = await response.json();
      } catch (err) {
        console.error(err.message);
      }
    }

    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        fetchMyAPI();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Party Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

	  <main className={styles.main}>
        <h1 className={styles.title}>{room.room_name}</h1>
		<h2 className={styles.title}>Room Id: {room.room_id}</h2>
		</main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  console.log(params);
  const toFetch = params.roomId;
  const results = await fetch(
    `http://localhost:5000/room/getroom?roomId=${toFetch}`
  ).then((r) => r.json());

  console.log(results);
  return {
    props: {
      room: results,
    },
  };
}

export async function getStaticPaths() {
  const rooms = await fetch("http://localhost:5000/room/getrooms").then((r) =>
    r.json()
  );
  // console.log(rooms[0].room_name);
  return {
    paths: rooms.map((room) => {
      const roomId = room.room_id;
      // console.log(typeof roomId)
      // console.log(roomId)
      return {
        params: {
          roomId,
        },
      };
    }),
    fallback: false,
  };
}

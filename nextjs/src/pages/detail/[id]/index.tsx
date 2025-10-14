import { moviesApi } from "@/api/movies";
import { useMovieDetailModal } from "@/hooks/useMovieDetailModal";
import MovieHomePage from "@/pages";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";

export default function MovieDetailPage() {
  return (
    <>
      <MovieHomePage />
      <DetailPageOpenModal />
    </>
  );
}

function DetailPageOpenModal() {
  const { query } = useRouter();
  const movieId = query.id;

  const { openMovieDetailModal } = useMovieDetailModal();
  const onceRef = useRef(false);

  useEffect(() => {
    if (movieId == null || onceRef.current === true) {
      return;
    }

    (async () => {
      onceRef.current = true;

      const movieDetail = await moviesApi.getDetail(Number(movieId));
      openMovieDetailModal(movieDetail.data);
    })();
  }, [movieId, openMovieDetailModal]);

  return null;
}

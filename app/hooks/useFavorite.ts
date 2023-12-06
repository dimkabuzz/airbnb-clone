import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import useLoginModalStore from "./useLoginModalStore";
import { User } from "@prisma/client";

type IUseFavorite = {
  listingId: string;
  currentUser?: User | null;
};

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModalStore = useLoginModalStore();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritesIds || [];

    return list.includes(listingId);
  }, [currentUser?.favoritesIds, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModalStore.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, loginModalStore, hasFavorited, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;

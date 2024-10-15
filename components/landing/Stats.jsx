"use client";
import { getData } from "@/server_functions/getData";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function Stats() {
  const [users, setUsers] = useState(0);
  const [links, setLinks] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAndSetData = async () => {
    setLoading(true);
    const [getUsers, getLinks, allClicks] = await getData();
    setUsers(getUsers);
    setLinks(getLinks);
    setClicks(allClicks);
    setLoading(false);
  };

  useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <section className="mb-20 py-16 rounded-sm bg-secondary/30 md:bg-transparent mt-10 px-6 md:px-20 lg:px-32 text-center sm:w-fit w-full sm:mx-auto">
      <div className="flex gap-5 items-center justify-center">
        <div className="grid !gap-0">
          <div className='flex items-center justify-center'>
            {!loading ? (
              <>
                <h3 className="text-3xl md:text-4xl">{users}</h3>
                <span className='text-2xl md:text-3xl'>+</span>
              </>
            ) : (
              <Skeleton className="w-14 h-8" />
            )}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">registered users</p>
        </div>
        <div className="grid !gap-0">
          <div className='flex items-center justify-center'>
            {!loading ? (
              <>
                <h3 className="text-3xl md:text-4xl">{links}</h3>
                <span className='text-2xl md:text-3xl'>+</span>
              </>
            ) : (
              <Skeleton className="w-14 h-8" />
            )}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">links shorted</p>
        </div>
        <div className="grid !gap-0">
          <div className='flex items-center justify-center'>
            {!loading ? (
              <>
                <h3 className="text-3xl md:text-4xl">{clicks}</h3>
                <span className='text-2xl md:text-3xl'>+</span>
              </>
            ) : (
              <Skeleton className="w-14 h-8" />
            )}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">link clicks</p>
        </div>
      </div>
    </section>
  )
};

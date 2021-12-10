import React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import StreamerCard from "../StreamerListSidebar/StreamerCard";

const TopNavbar = ({ streamerArr, changeChannel }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 md:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center md:items-stretch">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-white font-bold">Live Streamers</span>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel>
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              {streamerArr.map((user, i) => {
                return (
                  <Disclosure.Button as="button">
                    <StreamerCard
                      key={streamerArr[i].id}
                      user_name={streamerArr[i].user_name}
                      title={streamerArr[i].title}
                      viewer_count={streamerArr[i].viewer_count}
                      url={`https://www.twitch.tv/${streamerArr[
                        i
                      ].user_name.toLowerCase()}`}
                      profile_image_url={streamerArr[i].profile_image_url}
                      changeChannel={changeChannel}
                    />
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default TopNavbar;

/*
return (
    <div>
      <div>
        <div>
          <a href="https://dzrana.github.io/live-streamers/">Live Streamers</a>
        </div>
        <div>
          <div>
            <div>Streamers</div>
            <div>
              <ul>
                {streamerArr.map((user, i) => {
                  return (
                    <StreamerCard
                      key={streamerArr[i].id}
                      user_name={streamerArr[i].user_name}
                      title={streamerArr[i].title}
                      viewer_count={streamerArr[i].viewer_count}
                      url={`https://www.twitch.tv/${streamerArr[
                        i
                      ].user_name.toLowerCase()}`}
                      profile_image_url={streamerArr[i].profile_image_url}
                      changeChannel={changeChannel}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
*/

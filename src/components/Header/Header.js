import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Space, Dropdown, Button } from "antd";
import className from "classnames/bind";

import { controlSearchBox } from "~/components/SearchFeature/searchSlice";
import SearchFeature from "~/components/SearchFeature/SearchFeature";
import { LogoIcon, SearchIcon, CloseIcon } from "~/components/Icons";
import styles from "./Header.module.scss";
import { searchBoxSelector } from "~/app/store/selector";

const cx = className.bind(styles);

const renderMenu = (menu) => {
  return (
    <Menu
      items={menu.map((muItem) => ({
        key: muItem.key,
        label: (
          <Link key={muItem.key} to={muItem.path}>
            {muItem.label}
          </Link>
        ),
      }))}
    />
  );
};

const menu = {
  movies: [
    { key: 1, label: "Popular", path: "/movie" },
    { key: 2, label: "Now Playing", path: "/movie/now-playing" },
    { key: 3, label: "Upcoming", path: "/movie/upcoming" },
    { key: 4, label: "Top Rated", path: "/movie/top-rated" },
  ],
  tvShows: [
    { key: 1, label: "Popular", path: "/tv" },
    { key: 2, label: "Airing Today", path: "/tv/airing-today" },
    { key: 3, label: "On TV", path: "/tv/on-the-air" },
    { key: 4, label: "Top Rated", path: "/tv/top-rated" },
  ],
};

function Header() {
  const dispatch = useDispatch();
  const isSearch = useSelector(searchBoxSelector);
  return (
    <div className={cx("wrapper", "d-flex")}>
      <Link to="/" style={{ display: "flex" }}>
        <LogoIcon />
      </Link>
      <Space className={cx("navigate")} direction="row">
        <Dropdown overlay={renderMenu(menu.movies)} placement="bottomLeft">
          <Button className={cx("nav-item")} type="text">
            Movies
          </Button>
        </Dropdown>
        <Dropdown overlay={renderMenu(menu.tvShows)} placement="bottomLeft">
          <Button className={cx("nav-item")} type="text">
            TV Shows
          </Button>
        </Dropdown>
        {isSearch ? (
          <Button
            type="text"
            className={cx("search-btn")}
            icon={
              <CloseIcon
                onClick={() => {
                  dispatch(controlSearchBox(false));
                }}
              />
            }
          ></Button>
        ) : (
          <Button
            type="text"
            className={cx("search-btn")}
            icon={
              <SearchIcon
                onClick={() => {
                  dispatch(controlSearchBox(true));
                }}
              />
            }
          ></Button>
        )}
      </Space>
      {isSearch && <SearchFeature />}
    </div>
  );
}

export default Header;

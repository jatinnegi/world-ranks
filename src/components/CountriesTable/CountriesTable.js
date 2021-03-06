import { useState } from "react";
import styles from "./CountriesTable.module.css";
import {
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
} from "@material-ui/icons";
import Link from "next/link";

const orderBy = (countries, value, direction) => {
  if (direction === "asc")
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>
            <div>Name</div>
            {value === "name" && <SortArrow direction={direction} />}
          </div>
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>
            <div>Population</div>
            {value === "population" && <SortArrow direction={direction} />}
          </div>
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            <div>
              Area (km<sup style={{ fontSize: "0.7rem" }}>2</sup>)
            </div>
            {value === "area" && <SortArrow direction={direction} />}
          </div>
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>
            <div>Gini</div>
            {value === "gini" && <SortArrow direction={direction} />}
          </div>
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link key={country.alpha3Code} href={`/country/${country.alpha3Code}`}>
          <a>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country.flag} alt={country.name} />
              </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>{country.population}</div>
              <div className={styles.area}>{country.area || "-"}</div>
              <div className={styles.gini}>
                {country.gini ? `${country.gini}%` : "-"}
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;

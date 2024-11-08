import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import fetchEvents from "../../utils/fetchEvents";
import { Container, FiltersContainer } from "./styles";
import EventCard from "./partials/EventCard";
import Filters from "./partials/Filters";
import UserProfile from "./partials/UserProfile";
import { useAuthState } from "react-firebase-hooks/auth";

const Events = () => {
  const [user] = useAuthState(auth);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [wallet, setWallet] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const userDoc = await db.collection("users").doc(user.uid).get();

        if (userDoc.exists && userDoc.data().wallet !== undefined) {
          setWallet(userDoc.data().wallet);
        } else {
          await db.collection("users").doc(user.uid).set(
            {
              email: user.email,
              photoURL: user.photoURL,
              wallet: 50,
            },
            { merge: true }
          );
          setWallet(50);
        }
      };

      getUserData();
    }
  }, [user]);

  useEffect(() => {
    const getEventsData = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };

    getEventsData();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesName = event.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesCategory = searchCategory ? event.category.toLowerCase() === searchCategory.toLowerCase() : true;

      const matchesDateRange = searchStartDate && searchEndDate
        ? new Date(event.date) >= new Date(searchStartDate) && new Date(event.date) <= new Date(searchEndDate)
        : true;

      return matchesName && matchesCategory && matchesDateRange;
    });
    setFilteredEvents(filtered);
  }, [searchName, searchStartDate, searchEndDate, searchCategory, events]);

  const handleCardClick = (id) => navigate(`/event/${id}`);

  return (
    <Container>
      <FiltersContainer>
        <Filters
          searchName={searchName}
          searchStartDate={searchStartDate}
          searchEndDate={searchEndDate}
          searchCategory={searchCategory}
          onNameChange={(e) => setSearchName(e.target.value)}
          onStartDateChange={(e) => setSearchStartDate(e.target.value)}
          onEndDateChange={(e) => setSearchEndDate(e.target.value)}
          onCategoryChange={(e) => setSearchCategory(e.target.value)}
        />
        <UserProfile wallet={wallet} setWallet={setWallet} />
      </FiltersContainer>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} onClick={handleCardClick} />
        ))}
      </div>
    </Container>
  );
};

export default Events;
import React, { useState } from "react";
import "./App.scss";
import { InputGroup, FormControl, Button, Container } from "react-bootstrap";
import ArticleList from "./components/ArticleList";
import styles from "./App.module.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setValidation] = useState(true);

  const validation = () => {
    if (input.length < 40) {
      setValidation(true);
    }
  };
  async function getArticles(query) {
    try {
      setArticles([]);
      setIsLoading(true);
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          query
        )}&max=9&lang=en&token=${process.env.REACT_APP_API_KEY}`
      );
      console.log(process.env.REACT_APP_API_KEY);
      const data = await response.json();
      setArticles(data.articles);
      setIsLoading(false);
    } catch {}
  }
  const submitHandler = (event) => {
    if (input.length > 40) {
      setValidation(false);
      return;
    }
    getArticles(input);
  };
  return (
    <React.Fragment>
      {!isValid && <p styles={`color: red`}>Exceeded character limit: 40</p>}
      <section>
        <InputGroup
          onChange={(e) => {
            setInput(e.target.value);
            validation();
          }}
          id="input"
          size="default"
          className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
        >
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              <Button
                onClick={submitHandler}
                variant="primary"
                size="lg"
                active
              >
                Search
              </Button>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
      </section>
      <Container className="container">
        {!isLoading && <ArticleList articles1={articles}></ArticleList>}
        {isLoading && <p>Loading</p>}
      </Container>
    </React.Fragment>
  );
}

export default App;

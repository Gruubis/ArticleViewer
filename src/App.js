import React, { useState } from "react";
import "./App.scss";
import { InputGroup, FormControl, Button, Container } from "react-bootstrap";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setValidation] = useState(true);
  const [error, setError] = useState(false);

  const validation = () => {
    if (input.length < 40) {
      setValidation(true);
    }
  };
  async function getArticles(query) {
    try {
      if (input.trim().length === 0) {
        return;
      }
      setArticles([]);
      setIsLoading(true);
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          query
        )}&max=9&lang=en&token=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setArticles(data.articles);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }
  const submitHandler = (event) => {
    if (input.length > 40) {
      setValidation(false);
      return;
    }
    getArticles(input);
  };

  let content = <Container className="content">No Articles to Show</Container>;

  if (articles.length > 0) {
    content = <ArticleList articles={articles}></ArticleList>;
  }

  if (error) {
    content = <Container className="content">Bad request</Container>;
  }

  if (isLoading) {
    content = <Container className="content">Loading...</Container>;
  }

  return (
    <React.Fragment>
      {!isValid && (
        <label className="invalid">Exceeded character limit: 40</label>
      )}
      <section>
        <InputGroup
          onChange={(e) => {
            setInput(e.target.value);
            validation();
          }}
          id="input"
          size="default"
          className="form-control input"
        >
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              <Button className="btn" onClick={submitHandler}>
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
      <Container className="container">{content}</Container>
    </React.Fragment>
  );
}

export default App;

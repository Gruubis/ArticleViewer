import Card from "react-bootstrap/Card";
import "./Article.scss";

const Article = (props) => {
  const clickHandler = () => {
    window.open(props.url, "_blank");
  };
  const d = new Date(props.publishedAt);

  return (
    <Card border="dark" onClick={clickHandler}>
      <Card.Img src={props.image} />
      <Card.Title>{props.title}</Card.Title>
      <Card.Body>
        <Card.Text
          style={{
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {d.toDateString() + " " + d.toLocaleTimeString("en-US")}
      </Card.Footer>
    </Card>
  );
};

export default Article;

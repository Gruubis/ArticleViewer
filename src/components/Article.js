import Card from "react-bootstrap/Card";
import "./Article.scss";

const Article = (props) => {
  const clickHandler = () => {
    window.open(props.url, "_blank");
  };
  const d = new Date(props.publishedAt);

  return (
    <Card className="flex-item" border="dark" onClick={clickHandler}>
      <Card.Img className="card-image" src={props.image} />
      <Card.Title className="card-title">{props.title}</Card.Title>
      <Card.Body>
        <Card.Text className="card-text">{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="blockquote-footer">
        {d.toDateString() + " " + d.toLocaleTimeString("en-US")}
      </Card.Footer>
    </Card>
  );
};

export default Article;

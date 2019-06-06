import * as React from "react";
import { Link } from 'react-router-dom';

interface Props {
  user: {
    authorized: boolean,
    avatar: string,
    name: string,
  },
};

const Profile: React.FunctionComponent<Props> = (props) => {
  const { user } = props;

  return (
    <div className="user-block">
      {
        user.authorized
          ? (
            <Link to="/mylist">
              <div className="user-block__avatar">
                <img src={user.avatar} alt={`User avatar of ${user.name}`} width="63" height="63" />
              </div>
            </Link>
          )
          : (
            <Link to="/login" className="user-block__link">Sign in</Link>
          )
      }
    </div>
  );
}

export default Profile;

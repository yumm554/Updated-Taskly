import { Main } from '../assets/icons/icons';

function Welcome() {
  return (
    <div className="welcome-div">
      <div className="body-main">
        <h1 className="body-main-heading">
          Manage Tasks<div> Taskly</div>
        </h1>
        <p>Designed and developed by yuman saeed -</p>
        <div>
          <Main />
        </div>
      </div>
    </div>
  );
}
export default Welcome;

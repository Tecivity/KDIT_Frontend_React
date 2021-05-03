//React
import React, { useState, useEffect, useContext } from "react";
import Popup from "reactjs-popup";
import { MdCancel } from "react-icons/md";
//Components
import { SessionApi } from "../../hook/SessionApi";
import Post from "../PostCard/Post";
import FileUpload from "../../firebase/FileUpload";
//Firebase
import firebase from "../../firebase";
import "./index.css";
import { SubComService, UserService } from "../../services";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

const FullSubCom = ({ subCom, update }) => {
  //States
  const [edit, setEdit] = useState(false);
  const [posts, setPosts] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFollow, setIsFollow] = useState(false);
  const [subComData, setSubComData] = useState({});
  const [subComDummy, setSubComDummy] = useState({});
  const [voteNumber, setVoteNumber] = useState();

  //Contexts
  const { defaultBanner, userInfo, authListener } = useContext(SessionApi);

  //Functions
  const handleOnClick = () => {
    setEdit(!edit);
  };

  // const clearInput = () => {
  // 	setSubCom({ name: '', description: '' });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubCom = {
      ...subComDummy,
      name,
      description,
      bannerURL,
      photoURL,
    };
    update(newSubCom);
  };

  const getPost = (id) => {
    const postsArray = [];
    firebase
      .firestore()
      .collection("posts")
      .where("subComUID", "==", id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          postsArray.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsArray);
      });
  };

  const fetchData = async () => {
    if (subCom.id) {
      setSubComDummy(subCom);
      setName(subCom.name);
      setDescription(subCom.description);
      setBannerURL(subCom.bannerURL);
      setPhotoURL(subCom.photoURL);
      setVoteNumber(subCom.totalFollow.length);
      setSubComData({
        value: subCom.id,
        label: subCom.name,
      });
      getPost(subCom.id);
      try {
        const listSubCom = userInfo.mySubCom;
        if (listSubCom.some((listSubCom) => listSubCom["value"] == subCom.id)) {
          setIsFollow(true);
        }
      } catch (err) {
        UserService.updateUser(userInfo.id, { mySubCom: [] });
      }
    }
  };

  const followOnClick = async () => {
    const newFollowList = [...userInfo.mySubCom];
    const newTotalFollow = subComDummy.totalFollow;
    if (isFollow) {
      newFollowList.pop(subComData);
      newTotalFollow.pop(userInfo.id);
    } else {
      newFollowList.push(subComData);
      newTotalFollow.push(userInfo.id);
    }
    console.log(newFollowList);
    console.log(newTotalFollow);
    // setIsFollow(!isFollow)

    SubComService.updateSubCom(subCom.id, { totalFollow: newTotalFollow }).then(
      () => {
        console.log("update totalFollow success");
        SubComService.getSubCom(subCom.id).then((data) => {
          setSubComDummy(data);
          setVoteNumber(data.totalFollow.length);
          console.log("update totalFollow success");
        });
      }
    );
    UserService.updateUser(userInfo.id, { mySubCom: newFollowList }).then(
      () => {
        setIsFollow(!isFollow);
        authListener();
      }
    );
    if (!isFollow) {
      store.addNotification({
        title: "You successfully followed this sub-community!",
        message:
          "You will receive the post from this sub-community from now on.",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__flipInX"],
        animationOut: ["animate__animated", "animate__zoomOut"],
        dismiss: {
          duration: 8000,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    } else {
      store.addNotification({
        title: "You successfully unfollowed this sub-community, awwwww.",
        message:
          "You will not receive the post from this sub-community from now on. Sorry that you have to go.",
        type: "info",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__flipInX"],
        animationOut: ["animate__animated", "animate__zoomOut"],
        dismiss: {
          duration: 8000,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    }
  };

  //Effects
  useEffect(() => {
    fetchData();
  }, [subCom]);

	return (
		<div className="fullComPane">
			<div className="comInfoPane">
				<div className="bannerImgPane">
					<img
						src={subCom.bannerURL || defaultBanner}
						onError={defaultBanner}
						alt=""
						className="bannerImg"
						style={{ background: 'white' }}
					/>
				</div>
				<div className="subComImagePane">
					<img src={subCom.photoURL} alt="" className="subComImg" />
				</div>
				<h2 style={{ marginBottom: '0' }}>{subCom.name}</h2>
				<p
					style={{
						fontSize: '0.8rem',
						display: 'inline',
						color: 'grey',
						margin: '0',
					}}
				>
					{voteNumber} Members
				</p>

        <p>{subCom.description}</p>
        {isFollow ? (
          <>
            <button className="subcom-btn" onClick={followOnClick}>
              Followed
            </button>
          </>
        ) : (
          <>
            <button className="subcom-btn" onClick={followOnClick}>
              Follow
            </button>
          </>
        )}

				{userInfo.id == subCom.ownerUID ? (
					<>
						<Popup
							trigger={
								<>
									<button
										className="editCombtn"
										onClick={handleOnClick}
									>
										Edit
									</button>
									<button
										className="editCombtn"
										onClick={handleOnClick}
									>
										Delete
									</button>
								</>
							}
							modal
							className="comPopup"
						>
							{(close) => (
								<div className="modal">
									<div className="close" onClick={close}>
										<MdCancel
											size="30px"
											style={{ fill: '#f48c51' }}
										/>
									</div>
									<div className="header">
										<h1
											style={{
												paddingBottom: '0.5rem',
												borderBottom:
													'1px solid lightgrey',
											}}
										>
											Edit Community
										</h1>
									</div>
									<div className="content">
										<div className="fullsubcomForm">
											<div className="editSubComForm">
												<h1 htmlFor="">
													Profile Picture
												</h1>

                        <FileUpload url={photoURL} setUrl={setPhotoURL} />

                        <img
                          src={photoURL}
                          alt=""
                          className="full-editProfilePic"
                          draggable="false"
                        />
                      </div>

                      <div
                        className="editSubComForm"
                        style={{
                          borderBottom: "2px solid lightgrey",
                        }}
                      >
                        <h1 htmlFor="">Banner Picture</h1>

                        <FileUpload url={bannerURL} setUrl={setBannerURL} />

                        <img
                          src={bannerURL}
                          alt=""
                          className="full-editBannerPic"
                          draggable="false"
                          style={{
                            marginBottom: "2rem",
                          }}
                        />
                      </div>

                      <div className="inputForm">
                        <label htmlFor="">Community Name</label>
                        <input
                          type="text"
                          name="name"
                          className="nameInput"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="">Description</label>
                        <textarea
                          id=""
                          cols="30"
                          rows="10"
                          name="description"
                          className="desInput"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <button onClick={handleSubmit} className="btn">
                        <a
                          onClick={close}
                          style={{
                            color: "white",
                          }}
                        >
                          Save
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="fullComCard">
        <div className="content">
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullSubCom;

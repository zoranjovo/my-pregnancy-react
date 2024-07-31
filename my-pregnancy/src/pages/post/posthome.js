import { useParams, Link } from 'react-router-dom';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';

const posts = [
  { id: "0", title: "My experience in last 2 months", 
	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus ut faucibus pulvinar elementum integer enim neque. Nulla pharetra diam sit amet nisl. Risus feugiat in ante metus dictum. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Congue eu consequat ac felis donec consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor urna nunc id cursus. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim.\nPellentesque pulvinar pellentesque habitant morbi. Nec ultrices dui sapien eget. Ultrices neque ornare aenean euismod elementum. Ullamcorper a lacus vestibulum sed arcu non. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Lorem donec massa sapien faucibus. Placerat orci nulla pellentesque dignissim enim. Pharetra magna ac placerat vestibulum. Id donec ultrices tincidunt arcu non. Ultrices sagittis orci a scelerisque purus semper eget. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nunc mattis enim ut tellus elementum sagittis vitae et. In nulla posuere sollicitudin aliquam ultrices. At varius vel pharetra vel turpis nunc eget. Suspendisse ultrices gravida dictum fusce ut placerat orci.	Tristique nulla aliquet enim tortor. Sit amet commodo nulla facilisi nullam vehicula ipsum a. Eu volutpat odio facilisis mauris sit amet. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.", 
	poster: "Allie_Verra", 
	datePosted: "11/11/11", 
	viewCount: "1.8k Views",
	replyNo: 123},
  { id: "1", title: "Lorem ipsum dolor sit amet consectetur adipiscing elit", 
	content: "Faucibus et molestie ac feugiat sed lectus. In eu mi bibendum neque egestas congue quisque egestas. Ultrices sagittis orci a scelerisque purus semper eget.\
	Sit amet nulla facilisi morbi tempus iaculis urna. Ac placerat vestibulum lectus mauris ultrices eros in cursus",
	poster: "Allie_Verra", 
	datePosted: "11/11/11", 
	viewCount: "803 Views",
	replyNo: 63},
];

function PostPage(){
  const { id } = useParams();
  
  return (
    <div className={styles.outerdiv}>
		<h1 className="text-3xl font-medium text-blue">Welcome to the Forums</h1>
		<br />
		<Link to="/forums">
			<h2 className="text-2xl text-blue underline inline">Boards</h2>
        </Link>
		<h2 className="text-2xl text-blue inline"> >> </h2>
		<Link to="/discussion">
			<h2 className="text-2xl text-blue underline inline">General Discussion</h2>
        </Link>
		<h2 className="text-2xl font-medium text-blue inline"> >> {posts[id].title}</h2>
		<br />
		<br />
			<div className={styles.postContainer}>
				<div className={styles.postLeft}>pic here<h2>{posts[id].poster}</h2></div>
				<div className={styles.postRight}><h2>{posts[id].title}</h2>
					<br />
					<p>{posts[id].content}</p>
					<br />
					<button className={`${buttons.stylisedBtn} ${styles.reply}`}>Reply</button>
				</div>
				
			</div>

	</div>
  );
}

export default PostPage;

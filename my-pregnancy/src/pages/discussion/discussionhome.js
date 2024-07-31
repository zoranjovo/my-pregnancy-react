import { Link } from 'react-router-dom';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';

const posts = [
  { id: "0", title: "My experience in last 2 months", 
	content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
		"Purus ut faucibus pulvinar elementum integer enim neque. Nulla pharetra diam sit amet nisl. Risus feugiat in ante metus dictum. " +
		"Non pulvinar neque laoreet suspendisse interdum consectetur libero. Congue eu consequat ac felis donec consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
		"Aliquet enim tortor at auctor urna nunc id cursus. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Pellentesque pulvinar pellentesque habitant morbi. " +
		"Nec ultrices dui sapien eget. Ultrices neque ornare aenean euismod elementum. Ullamcorper a lacus vestibulum sed arcu non. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. " +
		"Lorem donec massa sapien faucibus. Placerat orci nulla pellentesque dignissim enim. Pharetra magna ac placerat vestibulum. Id donec ultrices tincidunt arcu non. " +
		"Ultrices sagittis orci a scelerisque purus semper eget. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Sagittis id consectetur purus ut faucibus pulvinar elementum. " +
		"Nunc mattis enim ut tellus elementum sagittis vitae et. In nulla posuere sollicitudin aliquam ultrices. At varius vel pharetra vel turpis nunc eget. Suspendisse ultrices gravida dictum fusce ut placerat orci. " +
		"Tristique nulla aliquet enim tortor. Sit amet commodo nulla facilisi nullam vehicula ipsum a. Eu volutpat odio facilisis mauris sit amet. Ornare arcu dui vivamus arcu felis bibendum ut tristique et.", 
	poster: "Allie_Verra", 
	datePosted: "11/11/11", 
	viewCount: "1.8k Views",
	replyNo: 123},
  { id: "1", title: "Lorem ipsum dolor sit amet consectetur adipiscing elit", 
	content: "Faucibus et molestie ac feugiat sed lectus. In eu mi bibendum neque egestas congue quisque egestas. Ultrices sagittis orci a scelerisque purus semper eget. " +
		"Sit amet nulla facilisi morbi tempus iaculis urna. Ac placerat vestibulum lectus mauris ultrices eros in cursus",
	poster: "Allie_Verra", 
	datePosted: "11/11/11", 
	viewCount: "803 Views",
	replyNo: 63},
];

function DiscussionHome(){  
  return (
	<div className={styles.outerdiv}>
		<h1 className="text-3xl font-bold text-blue">Welcome to the Forums</h1>
		<br />
		<Link to="/forums">
			<h2 className="text-2xl text-blue underline inline">Boards</h2>
        </Link>
		<h2 className="text-2xl font-bold text-blue inline"> &gt;&gt; General Discussion</h2>
		<br />
		<br />
		<div className={`${styles.boardName} ${buttons.stylisedTitle}`}>
			<h2 className="inline float-left">Posts</h2>
			<h2 className="inline float-right mr-12">Sort:   
				<div className={styles.top}>Top</div>
				<div className={styles.new}>New</div>
			</h2>
		</div>
		<br />
		<br />
		{posts.map((post, index) => (
			<div className={styles.boardContainer2}>
				<div className={styles.boardPost}>
					<h2><Link to={`/post/${post.id}`} key={index}>{post.title}</Link></h2>
					<p>{post.content}</p>
				</div>
				<Link to={`/post/${post.id}`} key={index}>
					<button className={styles.readMore}>Read More</button>
				</Link>
				<div className={styles.smallLine}></div>
				<div className={styles.postInfo}>
					<div className={styles.postPic}>pic here</div>
					<div className={styles.postName}><h2>{post.poster}</h2><p>{post.datePosted}</p></div>
					<div className={styles.postView}>{post.viewCount}</div>
					<div className={styles.postReplies}>{post.replyNo} replies</div>
				</div>
			</div>
		))}
	</div>
  );
}

export default DiscussionHome;


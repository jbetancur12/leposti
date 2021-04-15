import styles from "../styles/Questions.module.css"

import Title from './Title'

import { Comment, Avatar, Divider } from 'antd'

const Question = () => {
    return (
        <div className={styles.container} id="questions">
            <Title title="Preguntas" titleW="frecuentes" />
            <div className={styles.content}>
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p className={styles.textQ}>
                            ¿Lorem ipsum, dolor sit amet consectetur adipisicing elit?
                        </p>
                    }
                >
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <p className={styles.textA}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minima similique, sunt rem nihil, nam vero totam commodi neque nesciunt a. Ipsum, facilis incidunt atque reprehenderit repudiandae excepturi. Doloremque, saepe.
                            </p>
                        }
                    />
                </Comment>
                <Divider/>
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p className={styles.textQ}>
                            ¿Lorem ipsum, dolor sit amet consectetur adipisicing elit?
                        </p>
                    }
                >
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <p className={styles.textA}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minima similique, sunt rem nihil, nam vero totam commodi neque nesciunt a. Ipsum, facilis incidunt atque reprehenderit repudiandae excepturi. Doloremque, saepe.
                            </p>
                        }
                    />
                </Comment>
                <Divider/>
                <Comment
                    author={<a>Han Solo</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p className={styles.textQ}>
                            ¿Lorem ipsum, dolor sit amet consectetur adipisicing elit?
                        </p>
                    }
                >
                    <Comment
                        author={<a>Han Solo</a>}
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <p className={styles.textA}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus minima similique, sunt rem nihil, nam vero totam commodi neque nesciunt a. Ipsum, facilis incidunt atque reprehenderit repudiandae excepturi. Doloremque, saepe.
                            </p>
                        }
                    />
                </Comment>
            </div>
        </div>
    )
}

export default Question;
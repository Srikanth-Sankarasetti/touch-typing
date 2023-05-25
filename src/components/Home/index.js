import {Component} from 'react'

import './index.css'

const dataDiscription = [
  {
    id: 1,
    text:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.',
  },
  {
    id: 2,
    text:
      'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
  },
  {
    id: 3,
    text:
      'Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    seller: 'amatthessen4',
  },
  {
    id: 4,
    text:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.',
  },
  {
    id: 5,
    text:
      'Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.',
  },
]

class Home extends Component {
  state = {
    time: 60,
    textData:
      dataDiscription[Math.floor(Math.random() * dataDiscription.length)],
    inputText: '',
    crrtCount: 0,
    worgCount: 0,
    isDisabled: false,
    totalWordRead: 0,
  }

  checkWord = event => {
    this.setState({inputText: event.target.value})
  }

  timeCount = () => {
    this.timeId = setInterval(() => {
      this.setState(
        prevState => ({
          time: prevState.time - 1,
        }),
        this.clearInterva,
      )
    }, 1000)
  }

  clearInterva = () => {
    const {time, inputText, textData} = this.state
    if (time === 0) {
      clearInterval(this.timeId)
      const inputDate = inputText.split(' ')
      const splitText = textData.text.split(' ')
      const extracData = splitText.slice(0, inputDate.length)
      let crtCount = 0
      let wrgount = 0
      extracData.forEach(item => {
        if (inputDate.includes(item)) {
          crtCount += 1
        } else {
          wrgount += 1
        }
      })
      this.setState({
        time: 'Times Up',
        crrtCount: crtCount,
        worgCount: wrgount,
        isDisabled: true,
        totalWordRead: inputDate.length,
      })
      console.log(extracData)
    }
  }

  render() {
    const {
      time,
      textData,
      crrtCount,
      worgCount,
      isDisabled,
      totalWordRead,
    } = this.state
    const {text} = textData
    return (
      <div className="main-home-container">
        <div className="app-header">
          <img
            className="app-logo"
            src="https://res.cloudinary.com/ducrzzdqj/image/upload/v1684897792/5422721_2807211_ci3td0.jpg"
            alt="touch typing logo"
          />
          <h1 className="heading">
            Touch <span className="typing-span">Typing...</span>
          </h1>
        </div>
        <div className="text-data-container">
          <p className="para">{text}</p>
        </div>
        <div className="body-container">
          <textarea
            onClick={this.timeCount}
            className="text-area"
            rows="10"
            cols="80"
            placeholder="Type Here..."
            onChange={this.checkWord}
            disabled={isDisabled}
          />
        </div>
        <div>
          <h1 className="time-head">
            Time Left In Sec:
            <span className={time <= 10 ? 'time1' : 'time'}>{time}</span>
          </h1>
        </div>
        <div className="WPM-container">
          <div className="data">
            <h1>Correct Words:</h1>
            <h1>{crrtCount}</h1>
          </div>
          <div className="data">
            <h1>Wrong Word:</h1>
            <h1>{worgCount}</h1>
          </div>
        </div>
        <div className="WPM-container">
          <div className="data">
            <h1>WPM:</h1>
            <h1>{crrtCount}</h1>
          </div>
          <div className="data">
            <h1>Accuracy %:</h1>
            <h1>
              {isDisabled
                ? ((totalWordRead - worgCount) / totalWordRead) * 100
                : null}
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Home

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TravelGuide from './TravelGuide'

import './App.css'

class App extends Component {
  state = {isLoading: true, dataList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({isLoading: false, dataList: formatData})
      console.log(formatData)
    }
  }

  loadingView = () => (
    <div testid="loader" className="loader-con">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {dataList} = this.state
    return (
      <ul className="list-con">
        {dataList.map(e => (
          <TravelGuide details={e} key={e.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-con">
        <h1 className="heading">Travel Guide</h1>
        <div className="jp">
          {isLoading === true ? this.loadingView() : this.successView()}
        </div>
      </div>
    )
  }
}

export default App

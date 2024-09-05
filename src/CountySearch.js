import React, { useState, useEffect } from 'react';
import { countyData } from './countyData';
import headerImage from './assets/header.png';
import SearchBar from './SearchBar';
import Tooltip from './Tooltip';
import clipsImage from './assets/clips1.png';
import nytimesImage from './assets/nytimes.jpg';
import NumberTicker from './NumberTicker';
import natashaImage from './assets/natasha.png';
import causeyImage from './assets/causey.png';
import RateTicker from './RateTicker';

const preloadImages = () => {
  const images = [headerImage, clipsImage, nytimesImage, natashaImage, causeyImage];
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
};

const CountySearch = () => {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);

  const handleSelectCounty = (county) => {
    setSelectedCounty(county);
    setAnimationKey(prevKey => prevKey + 1);
  };

  const handleAutocompleteVisibility = (visible) => {
    setIsAutocompleteVisible(visible);
  };

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    if (selectedCounty) {
      const container = document.getElementById('datawrapper-vis-DRzg6');
      container.innerHTML = ''; // Clear previous content
      const script = document.createElement('script');
      script.src = "https://datawrapper.dwcdn.net/DRzg6/embed.js";
      script.async = true;
      container.appendChild(script);
    }
  }, [selectedCounty]);

  return (
    <>
      <img src={headerImage} alt="Header" className="header-image" />
      <div className={`county-search ${isAutocompleteVisible ? 'pushed' : ''}`}>
        <div className="search-content">
          <h1><strong>Mike Causey has approved an unprecedented 16 rate hikes as NC Commissioner of Insurance.</strong></h1>
          <br />
          <h2>Enter your county to see how Rate Hike Mike has hit your homeowners insurance rates.</h2>
          <br />
          <SearchBar 
            data={countyData} 
            onSelect={handleSelectCounty} 
            onAutocompleteVisibility={handleAutocompleteVisibility}
          />
          {selectedCounty && (
            <div className="result-container animate-fade-in" key={animationKey}>
              <h2>In {selectedCounty.County} County...</h2>
              <div className="info-box-container">
                <div className="info-box animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <p dangerouslySetInnerHTML={{ __html: selectedCounty["Higher than inflation"] }}></p>
                </div>
                <div className="info-box animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <p>This county has a <strong>{selectedCounty["2024 NCRB Proposed Rate increase"]}%</strong> rate hike request pending for 2024.</p>
                </div>
                <div className="info-box animate-fade-in" style={{animationDelay: '0.3s'}}>
                  <p><strong>{selectedCounty["% CTR Policy Premium 2023"]}%</strong> of policies were subject to Consent to Rate notices in 2023, allowing insurance companies to bill you up to 250% of the maximum rate.
                  <Tooltip content="[What's Consent to Rate?](https://www.charlotteobserver.com/news/local/article265676886.html)" /></p>
                </div>
                <div className="info-box animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <p className="info-text">
                    <strong>Mike Causey's impact on homeowners rates statewide</strong>
                    <Tooltip content="Rate increase data for Form Forms 2,3,5,7, and 8 filings. Some rate increases and proposed rates may be inaccurate for beach areas, which are regarded by DOI and the Rate Bureau as separate territories. Inflation data source: U.S. Bureau of Labor Statistics. Consent to Rate information organized by NC Rate Bureau territory. Source: [NCRB Rate Filings](https://www.ncrb.org/ncrb/Residential-Property/Data-Reporting), [NCDOI Data Calls](https://www.ncdoi.gov/data-calls)." />
                    <br />Tap or mouseover a county to see the impact of Mike Causey's rate hikes on that area.
                  </p>
                  <div id="datawrapper-vis-DRzg6"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`mask ${isAutocompleteVisible ? 'active' : ''}`}></div>
      <br /><br /><br />
      {/* New section */}
      <div className="county-search animate-on-scroll">
        <div className="search-content">
          <h1>Mike Causey's rate hikes by the numbers</h1>
          <br />
          <div className="info-box-container">
            <div className="info-box stats-box">
              <div className="stats-number">3</div>
              <div className="stats-text">
                <p>
                  <strong>Three</strong> homeowners insurance hikes. His predecessor only allowed <strong>one.</strong>
                  <Tooltip content="Sources: [Causey 2018 Rate Hike](https://chapelboro.com/news/state-news/2-agencies-reach-settlement-homeowners-insurance-rate), [Causey 2019 Rate Hike](https://www.ncdoi.gov/news/press-releases/2019/09/27/commissioner-causey-negotiates-settlement-homeowners%E2%80%99-mobile-home), [Causey 2021 Rate Hike](https://www.carolinacoastonline.com/news_times/article_a112f274-5dc6-11ec-9756-9b0c6f73a8b4.html), [2012 Wayne Goodwin Rate Hike](https://www.wunc.org/news/2017-11-22/insurance-companies-want-to-raise-homeowner-rates-for-nc-customers)." />
                </p>
              </div>
            </div>
            <div className="info-box stats-box">
              <div className="stats-number">3</div>
              <div className="stats-text">
                <p><strong>Three</strong> auto rate hikes. His predecessor allowed none and even <strong>retracted</strong> an auto increase during his tenure.
                  <Tooltip content="Sources: [2017 Causey Rate Hike](https://www.ncrb.org/Portals/0/ncrb/annual%20reports/NCRB%202017%20Annual%20Report.pdf?ver=2017-10-13-091709-000), [2024 and 2025 Causey Rate Hikes](https://www.newsobserver.com/news/local/article282412798.html), [Wayne Goodwin Rate Retraction](https://www.wral.com/news/local/story/5577164/)" />
                </p>
              </div>
            </div>
            <div className="info-box stats-box">
              <div className="stats-number">4</div>
              <div className="stats-text">
                <p><strong>Four</strong> dwelling rate hikes. His predecessor only allowed <strong>one.</strong>
                  <Tooltip content="Sources: [2018 Causey Rate Hike](https://www.insurancejournal.com/magazines/mag-features/2018/02/19/480624.htm), [2020 Causey Rate Hike](https://www.ncdoi.gov/news/press-releases/2022/08/22/nc-rate-bureau-requests-overall-426-rate-increase-dwelling-policies), [2022 Causey Rate Hike](https://www.ncdoi.gov/news/press-releases/2023/07/31/nc-rate-bureau-requests-overall-506-rate-increase-dwelling-policies), [2024 Causey Rate Hike](https://www.newsobserver.com/news/business/article289037174.html), [2013 Wayne Goodwin Rate Hike](https://www.insurancejournal.com/news/southeast/2012/11/27/271806.htm)" />
                </p>
              </div>
            </div>
            <div className="info-box stats-box">
              <div className="stats-number">6</div>
              <div className="stats-text">
                <p><strong>Six</strong> mobile home insurance hikes. His predecessor allowed only <strong>two.</strong>
                  <Tooltip content="Sources: [2019 2x Causey Rate Hikes](https://www.insurancejournal.com/news/southeast/2019/09/30/541569.htm), [2021 2x Causey Rate Hikes](https://www.carolinacoastonline.com/news_times/article_632278b2-43f0-11ec-b873-6b247d7007f4.html), [2023 2x Causey Rate Hike](https://wlos.com/news/local/mobile-home-owners-in-north-carolina-face-smaller-insurance-rate-increases-insurance-commissioner-mike-causey-north-carolina-rate-bureau-department-of-insurance), [2015 Wayne Goodwin Rate Hike](https://www.ncrb.org/Portals/0/ncrb/personal%20lines%20services/Rate%20Filings/4-22-15%20Final%20MH%28C%29%20Settlement%20Agreement%20and%20Consent%20Order.pdf?ver=2015-05-06-111356-000)" />
                </p>
              </div>
            </div>
            <div className="info-box stats-box">
              <div className="stats-number">3</div>
              <div className="stats-text">
                <p>Raised condo insurance rates <strong>three times</strong>, resulting in an average increase of <strong>over 21%</strong>.
                  <Tooltip content="Source: [NCRB Rate Filings](https://www.ncrb.org/ncrb/Residential-Property/Rate-Filings). Rate increase data for Form 6 filings." />
                </p>
              </div>
            </div>
            <div className="info-box stats-box">
              <div className="rate-ticker-wrapper">
                <RateTicker />
              </div>
              <div className="stats-text">
                <p>
                  NC used to pay the lowest auto rates in the country. Under Rate Hike Mike, NC <strong>dropped out of the top 5.</strong>
                  <Tooltip content="Source: [NC out of the top 5](https://www.usnews.com/insurance/auto/cheapest-states-for-car-insurance), [Lowest rates in the nation before Causey](https://www.cbsnews.com/media/the-five-best-and-worst-states-for-car-insurance-costs/)" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
      {/* New section for Rate Hike Mike's insurance company profits */}
      <div className="county-search animate-on-scroll">
        <div className="search-content">
          <div className="full-width-image-container animate-on-scroll">
            <img 
              src={clipsImage} 
              alt="Two newspaper clippings reading Wall Street Journal: Insurers rake in profits as customers pay soaring premiums and CBS 17: Some insurance companies report record profits amid NC rate hike request." 
              className="full-width-image" 
            />
            <h1>Causey has allowed insurance company profits to soar in NC, while his campaigns reap the rewards.<Tooltip content="Sources: [Wall Street Journal Article](https://www.wsj.com/finance/insurance-companies-profits-stock-ebae7fd1), [CBS 17 Article](https://www.cbs17.com/news/capitol-report/some-insurance-companies-report-record-profits-amid-nc-rate-hike-request/), [NY Times Article (below)](https://www.nytimes.com/interactive/2024/05/13/climate/home-insurance-profit-us-states-weather.html)" /></h1>
          </div>
          <div className="profit-box animate-on-scroll">
            <img src={nytimesImage} alt="New York Times" className="full-width-image" />
          </div>
          <div className="profit-box animate-on-scroll">
            <div className="number-ticker-container">
              <NumberTicker start={0} end={250000} duration={16} delay={2} prefix="$" suffix="+" />
            </div>
            <p className="profit-text">
              Causey has accepted more than $250,000 in campaign donations from insurance industry sources.
              <Tooltip content="Source: [NC State Board of Elections](https://cf.ncsbe.gov/CFOrgLkup/DocumentGeneralResult/?SID=STA-036R3D-C-001&OGID=30987)" />
            </p>
          </div>
        </div>
      </div>
      <div className="worse-option-section animate-on-scroll">
        <div className="worse-option-content">
          <div className="worse-option-text">
            <h1>Mike Causey isn't on our side.</h1>
            <h2>"Rate Hike Mike" is a former lobbyist with deep insurance industry ties. After eight years in office, we know the facts: Causey is <span className="underline-red">failing</span> North Carolinians.</h2>
            <ul className="worse-option-list">
              <li>Raised our insurance rates <strong>16 times</strong> without a single public hearing.
                <Tooltip content="Source: [News & Observer 7/10/24](https://www.newsobserver.com/news/business/article289037174.html)" />
              </li>
              <li>Pocketed over a <strong>quarter million dollars</strong> in campaign contributions from insurance industry sources.
                <Tooltip content="Source: [NC State Board of Elections](https://cf.ncsbe.gov/CFOrgLkup/DocumentGeneralResult/?SID=STA-036R3D-C-001&OGID=30987)" />
              </li>
              <li>Used <strong>taxpayer money</strong> to give his friends and political <strong>cronies</strong> high-paying jobs in the insurance department, instead of qualified experts.
                <Tooltip content="Source: [The Assembly 2/28/24](https://www.theassemblync.com/politics/mike-causey-insurance-commissioner-primary/)" />
              </li>
            </ul>
          </div>
          <div className="worse-option-image">
            <img src={causeyImage} alt="Mike Causey" className="causey-image" />
          </div>
        </div>
      </div>
      <div className="better-option-section animate-on-scroll">
        <div className="better-option-content">
          <div className="better-option-text">
            <h1>There's a better option for NC Insurance Commissioner:</h1>
            <h2>Natasha Marcus</h2>
            <ul className="better-option-list">
              <li><strong>Reject</strong> outrageous rate hikes that hurt North Carolinians.</li>
              <li>Hold <strong>public hearings</strong> so insurance companies have to justify rate hikes under oath.</li>
              <li><strong>Crack down</strong> on fraud that raises rates.</li>
              <li>Provide customers with more options and <strong>better prices</strong>.</li>
              <li>Refuse campaign contributions from insurance companies and make decisions based on the public's best interest.</li>
            </ul>
            <div className="desktop-spacer"></div>
            <a href="https://natashamarcus.com" target="_blank" rel="noopener noreferrer" className="learn-more-button">
              Learn more about Natasha Marcus
            </a>
          </div>
        </div>
        <div className="better-option-image">
          <img src={natashaImage} alt="Natasha Marcus" className="natasha-image" />
        </div>
      </div>
      <div className="footer-container animate-on-scroll">
        <div className="footer-box">
          <a href="https://www.natashamarcus.com/" style={{color: 'white', textDecoration: 'none'}}>Paid for by Friends of Natasha Marcus (<span style={{textDecoration: 'underline'}}>natashamarcus.com</span>)</a>
        </div>
      </div>
    </>
  );
};

export default CountySearch;

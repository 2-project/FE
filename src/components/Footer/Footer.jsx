import React from 'react';
import './Footer.css';
import lotte from '../img/lotte.png';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-top_left">
          <a href="https://www.mujikorea.net/display/displayShop.lecs?storeNo=1&siteNo=13013&displayNo=MJ2A01A01&displayMallNo=MJ2">
            About MUJI
          </a>
          <a href="https://www.muji.com/storelocator/?c=kr">매장정보</a>
          <a href="https://www.mujikorea.net/aboutMuji/aboutMujiRecruitInfo.lecs?displayMallNo=MJ2">
            채용공고
          </a>
          <a href="https://www.mujikorea.net/display/displayShop.lecs?storeNo=1&siteNo=13013&displayNo=MJ2A01A05&displayMallNo=MJ2">
            찾아오시는 길
          </a>
          <a href="https://lecs.mujikorea.net//voc/customerCenter.lecs">
            고객센터
          </a>
        </div>
        <div className="footer-top_right">
          <a className="link-button1" href="https://www.muji.com/">
            Global Site
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="grid-item">
          <img src={lotte} alt="MUJI 로고" style={{ height: '50px' }}></img>
        </div>
        <div className="grid-item">
          <a href="https://www.lecs.com/introduction/intro.show.lecs.brand.info.lecs">
            LECS안내 및 문의
          </a>
          <a href="https://story.lotteon.com/">롯데쇼핑e커머스사업부 소개</a>
          <a href="https://www.lotteon.com/p/common/footerPinfop">
            개인정보 처리방침
          </a>
          <a href="https://www.lotteon.com/p/common/footerTerms">이용약관</a>
          <a href="https://www.lotteon.com/p/common/footerYth">
            청소년보호방침
          </a>
          <a href="https://members.lpoint.com/exView/join/mbrJoin_01_001">
            회원가입/탈퇴
          </a>
        </div>
        <div className="grid-item">
          <div>
            <div className="light-text">
              롯데쇼핑 주식회사 대표이사 김사무엘상현, 정준호, 강성현
            </div>
            <div className="light-text">
              서울특별시 송파구 올림픽로 300 롯데월드타워 26층
            </div>
            <div className="light-text">
              사업자등록번호 : 529-85-00774 (롯데 쇼핑(주) e커머스사업부)
            </div>
            <div className="light-text">
              통신판매업 신고 : 2019-서울송파-0158
            </div>
            <div className="light-text">
              호스팅 서비스 사업자 : 롯데쇼핑㈜ e커머스사업부
            </div>
          </div>
          <div>
            <div className="bb">고객만족센터 : 1577-2892muji@lotte.net</div>
            <div className="light-text">
              MUJI 온라인스토어는 롯데 LECS(www.lecs.com)를 이용하고 있습니다.
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div>
            콘텐츠산업진흥법에 의한 콘텐츠보호안내
            <a
              href="https://www.copyright.or.kr/information-materials/law-precedent/view.do?brdctsno=42793"
              className="link-button2"
            >
              자세히 보기
            </a>
          </div>
          <div>서울보증보험 구매안전서비스 (쇼핑몰보증보험)</div>
          <div>
            <a
              href="https://www.mujikorea.net/display/shoppingServiceGuaranteePopup.lecs"
              className="link-button"
            >
              서비스 가입사실 확인
            </a>
          </div>
          <div className="light-text">
            고객님의 안전거래를 위해 현금 등으로 결제 시 결제금액의 전액에 대해
            저희 쇼핑몰에서 가입한 소비자 피해 보상보험 서비스를 이용하실 수
            있습니다.
          </div>
        </div>
        <div className="grid-item">
          Copyright LOTTE SHOPPING Co., Ltd. e-commerce Business Division All
          right reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

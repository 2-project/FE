import React from "react";
import "./index.css";

const PolicyTable = () => {
  return (
    <table>
      <colgroup>
        <col style={{ width: "11%" }} />
        <col style={{ width: "12%" }} />
        <col />
      </colgroup>
      <tr>
        <th scope="row" rowSpan="4">
          배송 정보 안내
        </th>
        <th scope="row">배송 지역</th>
        <td>
          <p>
            전국 배송(일부 지역 제외), 설치배송의 경우 강원도와 제주도 도서산간
            지역은 배송 불가합니다.
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">배송 방식</th>
        <td>
          <p>
            MUJIㆍ롯데e커머스의 물류센터를 통해 배송되는 상품은 택배회사를
            이용해 택배 배송되며, 그 외 설치 가구상품은 MUJI물류센터의 가구배송
            차량으로 고객님과 협의된 배송일에 배송됩니다.
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">배송비</th>
        <td>
          <p>
            택배배송 일반상품: 3.000원 (3만원이상 구입시 무료배송) /설치가
            필요한 가구: 50,000원 (50만원이상 구입시 무료 설치배송) 설치가구
            배송은 엘리베이터가 없는 4층이상 건물의 경우 사다리차
            비용(7~20만원)이 현장에서 별도 청구됩니다. 엘리베이터,계단,통로가
            협소한 3층이하의 경우에도 사다리차 비용이 발생되며,사다리차 진입이
            어려운 경우 배송불가로 되는 경우도 있습니다.
          </p>
          <p>
            <strong className="point_color01">
              가구는 설치 후 교환/반품 불가합니다.(상품하자 제외) 설치 전 반드시
              주문상품을 확인해 주세요.
            </strong>
          </p>

          <p>
            <a href="#myAdd2">
              <strong>나의 주소로 확인</strong>{" "}
              <img
                src="https://image.mujikorea.net/store/common/bul_arrow04.gif"
                alt="나의 주소로 확인"
              />
            </a>
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">배송 기간</th>
        <td>
          <p>
            일반 택배배송: 결제일 다음날부터 3일이내 발송(토,일 공휴일제외)
            산간•도서 지역은 배송기일이 추가적으로 소요 될 수 있으며,상품의
            재고상황에 따라 다소 지연될 수도 있습니다. 설치가구 상품배송: 상품에
            따라 20일이내에 배송됩니다.
          </p>
          <p>
            결제수단이 인터넷뱅킹/무통장입금인 경우 입금확인이 된 후 상품발송을
            진행하므로 배송 기간이 다소 늦어질 수 있습니다.{" "}
          </p>
          <p>
            해외배송 가구 상품은 생산지 혹은 수입처로부터 1:1주문형식으로
            수입되어 배송되는 상품입니다. 주문일로부터 평균 6~8주 정도 소요될 수
            있으며, 현지 사정에 따라 추가 지연이 발생할 수 있는 점 양해
            부탁드립니다.(통관상 배송지연 또는 생산지 혹은 수입처의 일시적인
            재고부족으로 주문이 취소될 수도 있사오니 이 점 양해 부탁드립니다)
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row" rowSpan="2">
          교환/환불 안내
        </th>
        <th scope="row">교환/환불규정(품질 보증 기준)</th>
        <td>
          <p>
            상품 수령 후 7일이내에 정상적인 사용상태에서 상품하자 발생시 교환 및
            환불이 가능합니다.
          </p>
          <p>
            고객의 단순 변심에 의한 제품의 교환 및 환불은 상품 미훼손 및
            사용하지 않은 상태일 경우 실제 상품을 수령하신 날부터 7일 이내
            가능하며 배송비는 고객 부담으로 유상 처리됩니다. 설치배송의 경우
            배송완료 · 제품 조립 후에는 교환 및 환불이 불가합니다.{" "}
          </p>
          <p>
            반품 하실 때는 부속품과 택을 반드시 상품과 동시에 반송해
            주십시오.(구매 명세서, 이너웨어 등의 패키지, 단추 등 상품의 부속품,
            상품에 붙어 있는 택ㆍ라벨, 사은품) 구성품과 택이 반송되지 않을시
            교환/반품이 불가하거나 추가의 택배배송이 발생될 수 있습니다.
          </p>
          <p>
            <a
              href="https://secure.mujikorea.net/voc/listFaqType.lecs?ql=300"
              target="_blank"
              title="새창"
              rel="noreferrer"
            >
              <strong>교환/환불규정 자세히 보기</strong>{" "}
              <img
                src="https://image.mujikorea.net/store/common/bul_arrow04.gif"
                alt="교환/환불규정 자세히 보기"
              />
            </a>
          </p>
          <p>
            품질보증기준: 품질 보증기간 이내 품질보증기준 관련법 및
            소비자분쟁해결 규정에 따름{" "}
          </p>
          <p>
            보상제외: 소비자 부주의에 의한 제품파손,훼손 및 세탁잘못에 의한
            변형, 품질 보증기간 이후 제품의 품질이상에 대해서는 보상의 책임을
            지지 않습니다.{" "}
          </p>
          <p className="point_color01">
            <strong>
              MUJI KOREA 공식 온라인 스토어에서 구매한 상품의 교환 및 환불은
              온라인 스토어 마이페이지, 온라인 스토어 고객센터를 통해서만 접수
              가능합니다. 오프라인매장은 시스템 상 접수가 불가한 점 양해 부탁
              드립니다.
            </strong>
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">교환/환불 배송비</th>
        <td>
          <p>
            상품 불량 이외 사이즈, 색상 교환 등 단순변심에 의한 교환 · 반품의
            경우, 상품 등의 반환에 필요한 왕복 배송 비용은 고객부담으로 유상
            처리됩니다. *전자상거래 등에서의 소비자보호에 관한 법률 제18조(청약
            철회등)9항에 의거 소비자의 사정에 의한 청약 철회 시 택배비는 소비자
            부담입니다. (반품: 3000원, 교환: 6000원)
          </p>
          <p>
            세트할인판매로 구매한 상품을 교환/반품할 경우, 할인혜택이 변동될 수
            있습니다.
          </p>
          <p>
            고객님이 받으신 상품 등의 내용이 표시ㆍ광고 내용과 다르거나
            계약내용과 다르게 이행되어 교환/반품을 하시는 경우에는, 교환/반품
            배송비는 무료입니다.
          </p>
          <p>
            환불 지연이 발생한 경우 전자상거래법에 따라 환불지연배상금 지급을
            요청하실 수 있습니다.지급조건과 절차는 고객센터FAQ에서 확인가능
            합니다. 환불지연 배상금액 기준: 전자상거래법 제18조 규정에 따라
            지급함
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row">취소/교환/반품 불가안내</th>
        <th scope="row">교환/반품 불가사유</th>
        <td>
          <p>
            고객님의 단순변심으로 인한 교환/반품 요청이 상품을 수령한 날로부터
            7일을 경과한 경우.고객님의 책임 있는 사유로 상품 등의 가치가 심하게
            파손되거나 훼손된 경우
          </p>
          <p>
            포장을 개봉하여{" "}
            <strong className="point_color01">
              사용하거나 설치가 완료되어 상품의 가치가 훼손된 경우에는
              교환/반품이 불가하오니
            </strong>{" "}
            이 점 양해하여 주시기 바랍니다. 단, 상품의 내용을 확인하기 위하여
            포장을 개봉한 경우에는 교환/반품이 가능합니다.
          </p>
          <p>
            <strong className="point_color01">
              배송된 상품이 하자없음을 확인한 후 설치가 완료된 가구상품의 경우
            </strong>
          </p>
          <p>
            <strong className="point_color01">
              설치 가구 상품은 나무결과 색상이 모니터 화면과 다소 상이할 수
              있으며, 설치 후 나무결 또는 색상에 대한 이유 또는 고객님의 단순
              주문착오로 인한 단순변심의 교환/환불 불가
            </strong>
          </p>
          <p>
            뷰티용품(밀봉포장 된 면봉, 화장솜등), 화장품, 식품류의 경우 개봉
            이후 상품의 가치 하락 및 훼손 등이 발생할 가능성이 매우 높고,
            이너웨어, 속옷, 캐미솔 등 피부에 직접 닿는 상품을 시착한 경우에도
            손쉽게 오염 등의 상품 훼손이 발생하게 됩니다. 가치 하락 및 훼손이
            발생한 상품은 부득이 교환/반품 등이 제한 될 수 있으니 이 점 양해를
            부탁 드립니다.{" "}
          </p>
          <p>
            재화등의 불만처리 및 소비자와 사업자 간 분쟁 처리 사항은 고객센터
            페이지 FAQ내용(분쟁해결)을 확인해 주시기 바랍니다.
          </p>
        </td>
      </tr>
      <tr>
        <th scope="row" colSpan="2">
          A/S 안내(세탁방법 및취급시 주의사항)
        </th>
        <td>
          <p>
            A/S 규정은 가구 및 부속 일부상품에만 적용이 됩니다. 품질 보증기간
            이내의 정상적인 사용상태에서 고장이 발생한 경우에만 무상으로
            서비스를 받으실 수 있습니다.
          </p>
          <p>
            품질 보증기간 이내에도 다음과 같은 경우에는 유상으로 처리가 됩니다.
            1. 소비자의 취급 부주의로 인한 파손 시 2. 천재지변
            (화재,지진,수해,낙뢰 등)으로 인한 파손 시
          </p>
          <p>
            제조년월:수입제품으로 입고시기에 따라 상이하기 때문에 확인이
            어렵습니다.고객센터로 문의 부탁드립니다.
          </p>
          <p>
            의류의 착용 및 세탁시에는 제품에 부착된 택 취급주의 사항과
            케어라벨의 세탁방법 및 제품특징을 꼭 확인해 주시기 바랍니다.
            (의류,패브릭은 부착된 케어라벨 내 안내에 따라 세탁해주세요){" "}
          </p>
          <p>
            <strong>전자제품의 경우</strong> 국내에서 수리가 불가하여 구매일에
            따라서 품질보증 및 피해보상규정이 있습니다. (상품에 동봉된
            사용설명서 또는 고객센터 상품별FAQ에서 확인 가능합니다)
          </p>

          <p className="point_color01">
            <strong>
              MUJI KOREA 공식 온라인 스토어에서 구매한 상품의 A/S 접수는 온라인
              스토어 고객센터를 통해서만 접수 가능합니다. 오프라인매장은 시스템
              상 접수가 불가한 부분 양해 부탁 드립니다.
            </strong>
          </p>
          <p>
            품질 보증기간 이후에는 A/S 접수 시 의뢰품의 왕복 배송 비용이
            유상으로 처리됩니다.
          </p>
          <p>
            자사 상품은 가정용 기준으로 품질보증을 운영하고 있으며 영업용 사용의
            경우 1/2의 품질 보증(기간 및 감가상각 금액)이 적용됩니다.
          </p>

          <p>A/S 고객센터 전화번호 : MUJI온라인 스토어 고객센터 1577-2892</p>
        </td>
      </tr>
      <tr>
        <th scope="row" colSpan="2">
          <img
            src="https://image.mujikorea.net/store/common/txt_minorityInfo.gif"
            alt="미성년자 권리보호 안내"
          />
        </th>
        <td>
          <p>
            미성년 고객께서 상품을 주문(계약) 하시는 경우, 법정대리인(부모님
            등)의 동의가 없으면 미성년자 본인 또는 법정대리인(부모님 등)이 그
            주문(계약)을 취소하실 수 있습니다.{" "}
          </p>{" "}
        </td>
      </tr>
    </table>
  );
};

export default PolicyTable;


# 감정공유 플랫폼 다락방

---
## 🗓 프로젝트 진행 기간
`2023.10.10 ~ 2023.11.17 (약 6주)`

---
## 📑 주제
AI 감정분석을 활용한 감정 다이어리 공유 플랫폼

---
## 🔑 주요 기능
![image](https://github.com/ssj946/Daracdang/assets/58605215/b4dbeb4a-c786-4f16-a678-6f3b13471b15)

![image](https://github.com/ssj946/Daracdang/assets/58605215/f42071e6-61f0-45da-bd20-d7a8de1da29b)

![image](https://github.com/ssj946/Daracdang/assets/58605215/756cf9a1-23a4-4eed-ab72-d8f9706a27bb)

![image](https://github.com/ssj946/Daracdang/assets/58605215/397a52cd-f62f-4dd7-aecc-a2ac5f71317f)

![image](https://github.com/ssj946/Daracdang/assets/58605215/9cc49c3c-8d18-423f-91ab-d46497e2c379)


---
## 🖥 서비스 화면

### 초기 화면

![image](https://github.com/ssj946/Daracdang/assets/58605215/0122958d-1256-48c8-80ba-94768bdcff85)


### 회원 가입

![image](https://github.com/ssj946/Daracdang/assets/58605215/a2e0949e-3aa6-4756-8469-c22d26caf57d)

### 로그인

 ![image](https://github.com/ssj946/Daracdang/assets/58605215/b8103357-b5e5-4deb-8acb-2489eb8ed845)

### 메인

![image](https://github.com/ssj946/Daracdang/assets/58605215/05de9eef-3122-49fc-8a12-4660ea69e77b)

### 다이어리 작성 (긍정적)

![image](https://github.com/ssj946/Daracdang/assets/58605215/ac9050f6-9d5f-4f34-8c8e-3d828d58c03d)

### 감정분석 결과

![image](https://github.com/ssj946/Daracdang/assets/58605215/07bf8b8a-2e71-481c-80af-f6a827da5335)


### 다이어리 댓글

![image](https://github.com/ssj946/Daracdang/assets/58605215/00c30ec7-14cc-44a0-babb-e3ba3b0c865c)

### 방명록 작성

![image](https://github.com/ssj946/Daracdang/assets/58605215/be67ec66-4e54-4ef1-b57d-2c60e8830988)

---
## 🏗️ 아키텍쳐

![image](https://github.com/ssj946/Daracdang/assets/58605215/d852f35e-e2af-48c2-8c37-a5cf3633db04)

---
## 🛠 기술 스택
### 백엔드
- 웹

    **Language |** java 17

    **Framework |** Spring Boot 3.1.5

    **Build Tool |** gradle 

    **Database |** MySQL 8.0.33

<br></br>
### 프론트엔드

**Language |** Javascript

**Framework |** react 18.2.0
    
**Engine |** Node.js 18.16.1
    

<br></br>
### 인프라

**Infra |** docker 24.0.6, docker-compose 2.21.0, nginx 1.18.0 (Ubuntu)

**CI/CD |** jenkins 2.414.1

**SSL certification |** certbot 0.40.0

---
## 📝 설계 문서

### 기능명세서
<details>
<summary>기능명세서</summary>
<div markdown="1"> 

<img src="https://github.com/ssj946/Daracdang/assets/58605215/628ea8c1-86ce-4451-bacc-0b9856501883"/>
<img src="https://github.com/ssj946/Daracdang/assets/58605215/d22b31cc-a9c0-4e6d-bbec-e90f4ed28c74"/>

</div>
</details>


### ERD
<details>
<summary>ERD</summary>
<div markdown="1">       
    <img src="https://github.com/ssj946/Daracdang/assets/58605215/fcf5acff-6ed0-4ac0-a306-9dfafd8d87a2"/>
</div>
</details>


### API
<details>
<summary>API 문서</summary>
<div markdown="1">       
    <img src="https://github.com/ssj946/Daracdang/assets/58605215/11cfd915-cfae-4693-89d3-c932f78eeac4"/>
</div>
</details>


### FIGMA
<details>
<summary>FIGMA</summary>

<img src="https://github.com/ssj946/Daracdang/assets/58605215/c1dfb703-4ff4-4dab-92b3-b8f568155e4e"/>

</details> 
---

## 담당 역할
---
이름|역할|
---|---|
이해준|다이어리, 댓글, 감정분석, 무드트래커 API 개발
조인혁|Infra, CICD, 배포 관련
권민재|방명록 API 개발, restdocs 문서화, 로그 관리
김경륜|이웃 관련 API 개발
우찬희|회원, 인증 , BGM API 개발
서수정|프론트 전체
    


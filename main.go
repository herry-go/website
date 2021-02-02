package main

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"sync"
)

//var Urls = [...]string{
//	//"http://www.weijin365.com/",
//	"http://www.wanxuechuang.com/",
//}

var FileName = "D:/goProject/src/website/麦穗教育"
var WebUrl = "http://www.maisuimx.com"
var rwlock sync.RWMutex // 全局读写锁 rwlock


func main()  {
	//for _, url := range Urls {
	//}
	var url = WebUrl
	resp, err := http.Get(url)
	parseHtml(url,1)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	//fmt.Println(string(body))
	if resp.StatusCode == 200 {
		fmt.Println("请求成功")
		fname :=  "/html/index.html"
		CreateMutiDir(FileName +fname)
		f, err := os.OpenFile(FileName +fname, os.O_CREATE|os.O_RDWR, os.ModePerm)
		if err != nil {
			fmt.Println(err.Error())
		}
		f.Write(body)
		f.Close()

	}


}

func parseHtml(url string, mod int){

	doc, err := goquery.NewDocument(url)
	if mod == 1 {
		if err != nil {
			fmt.Println(err.Error())
		}
		s := doc.Find("script")
		s.Each(func(i int, content  *goquery.Selection) {
			url,_ := content .Attr("src")
			fmt.Println(url)
			riteData(url)
		})
		l := doc.Find("link")
		l.Each(func(i int,content  *goquery.Selection) {
			url,_ := content.Attr("href")
			fmt.Println(url)
			riteData(url)

		})
		i := doc.Find("img")
		i.Each(func(i int,content  *goquery.Selection) {
			url,_ := content.Attr("src")
			fmt.Println(url)
			riteData(url)

		})
		a := doc.Find("a")
		a.Each(func(i int,content  *goquery.Selection) {
			url,_ := content.Attr("href")
			fmt.Println(url)
			riteData(url)

		})
	} else {
		i := doc.Find("img")
		i.Each(func(i int,content  *goquery.Selection) {
			url,_ := content.Attr("src")
			fmt.Println(url)
			riteData(url)

		})
	}


}

func riteData(url string){
	body := DoGet(WebUrl+url)

	if body == nil {
		return
	}
	//fmt.Println(string(body))
	var file string
	file = FileName
	fname := file + url
	CreateMutiDir(fname)
	if !strings.Contains(fname,"."){
		fname += "index.html"
		parseHtml(WebUrl+url,2)
	}
	f, err := os.OpenFile(fname, os.O_CREATE|os.O_RDWR, 0666)
	if err != nil {
		fmt.Println(err.Error())
	}
	f.Write(body)
	f.Close()
}


func CreateMutiDir(filePath string) error {
	filePath = filePath[0:strings.LastIndex(filePath,"/")+1]

	if !isExist(filePath) {
		err := os.MkdirAll(filePath, os.ModePerm)
		if err != nil {
			fmt.Println("创建文件夹失败,error info:", err)
			return err
		}
		return err
	}
	return nil
}

// 判断所给路径文件/文件夹是否存在(返回true是存在)
func isExist(path string) bool {
	_, err := os.Stat(path) //os.Stat获取文件信息
	if err != nil {
		if os.IsExist(err) {
			return true
		}
		return false
	}
	return true
}

func DoGet(url string) []byte{
	client := &http.Client{}
	req,_ := http.NewRequest("GET",url,nil)
	req.Header.Add("X-AUTH-TOKEN","eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNTc3ODI1MDI1NSIsInN1YiI6IjE1Nzc4MjUwMjU1IiwiaWF0IjoxNjA4MzUwMjQ2fQ.8pS7nUx4P6mcf0LXIATIgmQt_5F2OKI370T6-uqknEc")
	req.Header.Add("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")
	req.Header.Add("Content-Type","application/json;charset=UTF-8")
	resp,_ := client.Do(req)
	if resp != nil && resp.StatusCode == 200 {
		fmt.Println("请求成功")
		body, _ := ioutil.ReadAll(resp.Body)
		return  body
	} else {
		fmt.Println("请求失败")
	}
	return nil
}

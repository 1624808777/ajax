package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.dao.UserDao;
import model.vo.User;
@WebServlet(urlPatterns = "/login.do")
public class LoginController extends HttpServlet {

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//1.取数据
		request.setCharacterEncoding("utf-8");
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
		String vcode=request.getParameter("vcode");
		
		//2.处理
		HttpSession session=request.getSession();
		String saveCode=(String)session.getAttribute("verifyCode");
		String forwardPath = "";
		
		if(!vcode.equalsIgnoreCase(saveCode)){//验证码错误
			request.setAttribute("info", "验证码错误");
			forwardPath = "/error.jsp";	
		}
		else{ //正确
			UserDao userDao=new UserDao();
			if(userDao.get(userName) == null){ //用户名不存在
				request.setAttribute("info", "用户名不存在");
				forwardPath = "/error.jsp";
			}
			else{ //用户名存在
				User currentUser = userDao.get(userName, password);
				if(currentUser == null){ //密码错误
					request.setAttribute("info", "密码错误");
					forwardPath = "/error.jsp";
				}
				else{//密码正确
					session.setAttribute("currentUser", currentUser);
					forwardPath = "/main.jsp";
				}
			}
			
		}
		//3.转发
		RequestDispatcher rd=request.getRequestDispatcher(forwardPath);
		rd.forward(request, response);
	}
}

